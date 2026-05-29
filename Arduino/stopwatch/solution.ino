#include "funshield.h"

// --- variables, constants ---
constexpr int BTN_PINS[] = {BUTTON1_PIN, BUTTON2_PIN, BUTTON3_PIN};
constexpr int BTNS_COUNT = sizeof(BTN_PINS) / sizeof(BTN_PINS[0]);

constexpr int START_BTN_ID = 0;
constexpr int STOP_BTN_ID = START_BTN_ID;
constexpr int LAP_BTN_ID = 1;
constexpr int RESUME_BTN_ID = LAP_BTN_ID;
constexpr int RESET_BTN_ID = 2;
constexpr int MINIMUM_DELAY_BETWEEN_BUTTON_PRESSES = 50;
unsigned long long lastSuccessfulBtnPress;

constexpr int DISPLAYS_COUNT = 4;



constexpr int POWERS_OF_10[] = {1, 10, 100, 1000, 10000};

constexpr int BASE = 10; // Number length is measured in base 10
constexpr int MILLIS_IN_SECOND = 1000;
constexpr int DECIMAL_POSITION = 1;
constexpr byte DECIMAL_SEPARATOR_CODE = 0x7F;



enum class State {
  STOPPED,  
  RUNNING,  
  LAPPED    
};


// --- struct(s) ---

int getDigit(int number, int position);

struct Seg7Display{
  int positionBits;
  int positionNumber;

  void init(int pos){
    positionBits = 1 << (DISPLAYS_COUNT-1-pos);
    positionNumber = pos;
  }

  void writeGlyph(int glyph){
    digitalWrite(SEG7_LATCH_PIN, LOW);
    shiftOut(SEG7_DATA_PIN, SEG7_CLOCK_PIN, MSBFIRST, glyph);
    shiftOut(SEG7_DATA_PIN, SEG7_CLOCK_PIN, MSBFIRST, positionBits);
    digitalWrite(SEG7_LATCH_PIN, HIGH);
  }

  void writeDigit(int digit){
    byte digit_code = SEG7_DIGIT_GLYPHS[digit];
    if (positionNumber == DECIMAL_POSITION) digit_code = SEG7_DIGIT_GLYPHS[digit] & DECIMAL_SEPARATOR_CODE;
    
    writeGlyph(digit_code);
  }

  void writeDigitFromNumber(int wholeNumber){
    int digit = getDigit(wholeNumber, positionNumber);
    writeDigit(digit);
  }
};

Seg7Display displays[DISPLAYS_COUNT];

struct Button{
  int pin;
  unsigned long long lastSuccessfulPress;

  void init(int PIN){
    pin = PIN;
    pinMode(PIN, INPUT);
    lastSuccessfulPress = millis() - MINIMUM_DELAY_BETWEEN_BUTTON_PRESSES;
  }

  bool isPressed(){
    return !digitalRead(pin);
  }

  bool isPressedWithDelay(){
    if (isPressed() && (millis() - lastSuccessfulPress) > MINIMUM_DELAY_BETWEEN_BUTTON_PRESSES )
    {
      lastSuccessfulPress = millis();
      return true;
    }
    return false;
  }

};
Button btns[BTNS_COUNT];

struct WatchState{
  State currState = State::STOPPED;
  unsigned long long lastTime = 0; 
  unsigned long long shownTime = 0; 
  int counter = 0;
};
WatchState ws;

// -- functions ---

int getDigit(int number, int position){
  return number % POWERS_OF_10[position+1] / POWERS_OF_10[position];
}



void initBtns(Button btns[]){
  for (int i = 0; i < BTNS_COUNT; i++) {
    btns[i].init(BTN_PINS[i]);
  }
}

void initDisplays(Seg7Display displays[]){
  for (int i = 0; i < DISPLAYS_COUNT; i++){
    displays[i].init(i);
  }
}




void initSeg7(){
  pinMode(SEG7_LATCH_PIN, OUTPUT);
  pinMode(SEG7_CLOCK_PIN, OUTPUT);
  pinMode(SEG7_DATA_PIN, OUTPUT);
}

void reset(WatchState& ws){
  ws.shownTime = 0;
}
void start(WatchState& ws){
  ws.currState  = State::RUNNING;
  ws.lastTime = millis();
}
void lap(WatchState& ws){
  ws.currState  = State::LAPPED;
}
void stop(WatchState& ws){
  ws.currState  = State::STOPPED;
}
void resume(WatchState& ws){
  ws.currState = State::RUNNING;
}

void manageRunningState(WatchState& ws){
  unsigned long long timeNow = millis();
  ws.shownTime += (timeNow - ws.lastTime);
  ws.lastTime = timeNow;
  
}

int getShownNumber(WatchState ws){
  ws.shownTime /= (MILLIS_IN_SECOND / POWERS_OF_10[DECIMAL_POSITION] );
  ws.shownTime %= POWERS_OF_10[DISPLAYS_COUNT];

  return (int)(ws.shownTime);
}

int getNumberLength(int number){

  int len = 0;
  while (number != 0){
    number /= BASE;
    len++;
  }
  return max(len, DECIMAL_POSITION+1);
}


void displayTime(WatchState& ws, Seg7Display displays[]){
  int shownNumber = getShownNumber(ws);
  int numLen = getNumberLength(shownNumber);

  if (ws.counter < numLen){
    int digit = getDigit(shownNumber, ws.counter);
    displays[ws.counter].writeDigit(digit);
  }

  ws.counter = (ws.counter + 1) % DISPLAYS_COUNT;
}


// --- setup, loop ---

void setup() {
  initSeg7();

  initBtns(btns);
  initDisplays(displays);
  //Serial.begin(9600);

  
  displays[0].writeDigit(0);

  lastSuccessfulBtnPress = millis() - MINIMUM_DELAY_BETWEEN_BUTTON_PRESSES;
  
}

void loop() {

  switch(ws.currState) {
    case State::STOPPED:
      if ( btns[RESET_BTN_ID].isPressedWithDelay() ) reset(ws);
      else if ( btns[START_BTN_ID].isPressedWithDelay() ) start(ws);

      break;
    case State::RUNNING:
      if ( btns[LAP_BTN_ID].isPressedWithDelay() ) lap(ws);
      else if ( btns[STOP_BTN_ID].isPressedWithDelay() ) stop(ws);
      else manageRunningState(ws);

      break;
    case State::LAPPED:
      if ( btns[RESUME_BTN_ID].isPressedWithDelay() ) resume(ws);

      break;
  }

  displayTime(ws, displays);
}
