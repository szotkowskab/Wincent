#include "funshield.h"
#include "input.h"

// --- variables, constants ---

constexpr int DISPLAYS_COUNT = 4;
constexpr unsigned int SCROLLING_INTERVAL = 300;

int PADDING_LEFT_LEN = DISPLAYS_COUNT; 

SerialInputHandler input;

// --- struct(s) ---

struct Seg7Display{
  int positionBits;
  int positionNumber;

  void init(int pos){
    positionBits = 1 << (DISPLAYS_COUNT-1-pos);
    positionNumber = pos;
  }

  void writeGlyph(byte glyph){
    digitalWrite(SEG7_LATCH_PIN, LOW);
    shiftOut(SEG7_DATA_PIN, SEG7_CLOCK_PIN, MSBFIRST, glyph);
    shiftOut(SEG7_DATA_PIN, SEG7_CLOCK_PIN, MSBFIRST, positionBits);
    digitalWrite(SEG7_LATCH_PIN, HIGH);
  }


  static void initSeg7(){
    pinMode(SEG7_LATCH_PIN, OUTPUT);
    pinMode(SEG7_CLOCK_PIN, OUTPUT);
    pinMode(SEG7_DATA_PIN, OUTPUT);
  }

  static byte charToGlyph(char ch)
  {
    byte glyph = SEG7_EMPTY_GLYPH;
    if (isAlpha(ch)) {
      glyph = SEG7_LETTER_GLYPHS[ ch - (isUpperCase(ch) ? 'A' : 'a') ];
    }
    if (isDigit(ch)){
      glyph = SEG7_DIGIT_GLYPHS[ ch - '0' ];
    }
    return glyph;
  }
};

Seg7Display displays[DISPLAYS_COUNT];

struct runningMessage {
  unsigned long int lastScroll;
  int currIndex = 0;  // index pointing to a padded currMessage, not currMessage itself (padding is explained in more detail in getCharAtIndexWithPadding)
  int multiplexCounter = 0;
  const char* currMessage;
  Seg7Display* seg7Displays;

  void init(unsigned long int LastScroll, const char* Message, Seg7Display Displays[]){
    lastScroll = LastScroll;
    currMessage = Message;
    seg7Displays = Displays;
  }

  char getCharAtIndexWithPadding(){
    // Returns char at given index, where index points to a padded string. 
    // A padded string is a string with PADDING_LEFT_LEN spaces before it and PADDING_LEFT_LEN-1 after it.
    if (currIndex+multiplexCounter < PADDING_LEFT_LEN) return ' ';

    for(int i = 0; i <= currIndex+multiplexCounter-PADDING_LEFT_LEN; i++){
      if (*(currMessage+i) == '\0') return ' ';
    }

    return *(currMessage+currIndex+multiplexCounter-PADDING_LEFT_LEN);
    
  }

  bool pointingToEnd(){
    if (currIndex+1 < PADDING_LEFT_LEN) return false;
    return *(currMessage+(currIndex-PADDING_LEFT_LEN+1)) == '\0';
  }

  void displayText(){
    char ch = getCharAtIndexWithPadding();
    byte glyph = Seg7Display::charToGlyph(ch);
    seg7Displays[DISPLAYS_COUNT - multiplexCounter-1].writeGlyph(glyph);

    multiplexCounter = (multiplexCounter+1) % DISPLAYS_COUNT;
  }

};
runningMessage rm; 

// -- functions ---

void initDisplays(Seg7Display displays[]){
  Seg7Display::initSeg7();
  for (int i = 0; i < DISPLAYS_COUNT; i++){
    displays[i].init(i);
  }
}

// --- setup, loop ---

void setup() {
  initDisplays(displays);

  rm.init(millis() /*- SCROLLING_INTERVAL - 1*/, input.getMessage(), displays); 

  Serial.begin(9600);

  input.initialize();
}

void loop() {
  input.updateInLoop();

  if (millis() - rm.lastScroll >= SCROLLING_INTERVAL){

    if (rm.pointingToEnd()) { // we're at the end -> get new message
      rm.currMessage = input.getMessage();
      rm.currIndex = 0;
    }
    else { // we just need to move by one char
      rm.currIndex++;
    }

    rm.lastScroll = millis(); 
    
  }
  
  rm.displayText();

}




