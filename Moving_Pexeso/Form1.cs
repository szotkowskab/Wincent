// rekordy na pohyblivé verzi 6x6:
// Bratr s kamarádem : 159
// Já                :  80
// Jirka             : "už mě to nebaví"

namespace Pexeso
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            NastavStav(STAV.START);
            debug = vytvorDebugLabel();
            timer1.Interval = 50;
            timer1.Start();


        }
        enum STAV { START, HRA, JEDNA, DVE, VYHRA };
        STAV stav;
        Button otevrenaKarta1;
        Button otevrenaKarta2;
        Label debug;
        int pocetTahu = 0;
        int pocetBodu = 0;
        bool spravne = false;
        Random rnd = new Random();
        Button[] karticky = new Button[POCET_KARET];


        // rozestavění kartiček
        const int POCET_KARET_V_RADKU = 6;
        const int POCET_KARET = POCET_KARET_V_RADKU * POCET_KARET_V_RADKU; // neměnit
        const int HORNI_OKRAJ = 100;
        const int DOLNI_OKRAJ = 20;
        const int BOCNI_OKRAJ = 20;
        const int ROZESTUPY = 10;
        const string TEXT_RUBU = "PEXESO";

        // hranice odrazu pohyblivých kartiček
        const int VZDALENOST_HRANICE_OD_OKRAJE = 10;

        // nastavení pohybu
        bool pohyb;
        int maxRychlost = 10;

        void NastavStav(STAV novyStav)
        {
            switch (novyStav)
            {
                case STAV.START:
                    pocetTahu = 0;
                    pocetBodu = 0;

                    LNadpis.Visible = true;
                    LZadani.Visible = true;
                    LStaticka.Visible = true;
                    BStaticka.Visible = true;
                    LPocetBodu.Visible = false;
                    LPocetTahu.Visible = false;
                    LGratulace.Visible = false;
                    LVysledek.Visible = false;

                    BStart.Visible = true;
                    BKonec.Visible = false;
                    BRestart.Visible = false;
                    break;
                case STAV.HRA:
                    if (stav == STAV.START || stav == STAV.VYHRA) vytvorKarticky();

                    LNadpis.Visible = false;
                    LZadani.Visible = false;
                    LStaticka.Visible = false;
                    BStaticka.Visible = false;
                    LPocetBodu.Visible = true;
                    LPocetTahu.Visible = true;
                    LGratulace.Visible = false;
                    LVysledek.Visible = false;

                    BStart.Visible = false;
                    BKonec.Visible = true;
                    BRestart.Visible = false;
                    break;
                case STAV.JEDNA:
                    LNadpis.Visible = false;
                    LZadani.Visible = false;
                    LStaticka.Visible = false;
                    BStaticka.Visible = false;
                    LPocetBodu.Visible = true;
                    LPocetTahu.Visible = true;
                    LGratulace.Visible = false;
                    LVysledek.Visible = false;

                    BStart.Visible = false;
                    BKonec.Visible = true;
                    BRestart.Visible = false;
                    break;
                case STAV.DVE:
                    LNadpis.Visible = false;
                    LZadani.Visible = false;
                    LStaticka.Visible = false;
                    BStaticka.Visible = false;
                    LPocetBodu.Visible = true;
                    LPocetTahu.Visible = true;
                    LGratulace.Visible = false;
                    LVysledek.Visible = false;

                    BStart.Visible = false;
                    BKonec.Visible = true;
                    BRestart.Visible = false;
                    break;
                case STAV.VYHRA:
                    odstranKarticku(otevrenaKarta1);
                    odstranKarticku(otevrenaKarta2);

                    LNadpis.Visible = false;
                    LZadani.Visible = false;
                    LStaticka.Visible = false;
                    BStaticka.Visible = false;
                    LPocetBodu.Visible = false;
                    LPocetTahu.Visible = false;
                    LGratulace.Visible = true;
                    LVysledek.Visible = true;

                    BStart.Visible = false;
                    BKonec.Visible = false;
                    BRestart.Visible = true;

                    LVysledek.Text = pocetTahu.ToString();
                    break;

                default:
                    break;
            }
            stav = novyStav;
        }
        private void klikNaKarticku(object sender, EventArgs e)
        {
            Button b = (Button)sender;

            switch (stav)
            {
                case STAV.HRA:

                    NastavStav(STAV.JEDNA);
                    otevriKarticku(b);
                    otevrenaKarta1 = b;
                    break;

                case STAV.JEDNA: // otevírám druhou kartu

                    if (b.Name != otevrenaKarta1.Name)
                    {
                        otevriKarticku(b);
                        otevrenaKarta2 = b;

                        //debug.Text = $"{otevrenaKarta1.Tag}, {otevrenaKarta2.Tag}, {otevrenaKarta1.Tag == otevrenaKarta2.Tag}";
                        Tag t1 = otevrenaKarta1.Tag as Tag;
                        Tag t2 = otevrenaKarta2.Tag as Tag;
                        if (t1.cislo == t2.cislo)
                        {
                            otevrenaKarta1.BackColor = Color.LightGreen;
                            otevrenaKarta2.BackColor = Color.LightGreen;
                            pocetBodu += 1;
                            spravne = true;
                        }
                        else spravne = false;

                        pocetTahu += 1;
                        aktualizujPocty(pocetTahu, pocetBodu);

                        if (pocetBodu == (POCET_KARET / 2)) NastavStav(STAV.VYHRA);

                        else NastavStav(STAV.DVE);

                    }


                    break;

                case STAV.DVE:

                    if (spravne)
                    {
                        odstranKarticku(otevrenaKarta1);
                        odstranKarticku(otevrenaKarta2);
                    }
                    else
                    {
                        zavriKarticku(otevrenaKarta1);
                        zavriKarticku(otevrenaKarta2);
                    }
                    NastavStav(STAV.HRA);
                    break;
            }
        }

        void zavriKarticku(Button karta)
        {
            karta.Text = TEXT_RUBU;
        }
        void otevriKarticku(Button karta)
        {
            Tag t = karta.Tag as Tag;
            karta.Text = t.cislo.ToString();
        }
        void odstranKarticku(Button karta)
        {
            if (karta != null)
            {
                this.Controls.Remove(karta);
                karta.Dispose();
            }

        }

        void aktualizujPocty(int tahy, int body)
        {
            LPocetTahu.Text = "Počet tahů: " + tahy.ToString();
            LPocetBodu.Text = "Počet bodů: " + body.ToString();
        }

        void vytvorKarticky()
        {
            int[] cisla = new int[POCET_KARET];
            for (int i = 0; i < POCET_KARET; i++)
            {
                cisla[i] = i / 2 + 1;

            }
            int[] zamichane = zamichej(cisla);
            //int[] zamichane = cisla;


            int sx = (ClientRectangle.Width - 2 * BOCNI_OKRAJ - (POCET_KARET_V_RADKU - 1) * ROZESTUPY) / POCET_KARET_V_RADKU;
            int sy = (ClientRectangle.Height - HORNI_OKRAJ - DOLNI_OKRAJ - (POCET_KARET_V_RADKU - 1) * ROZESTUPY) / POCET_KARET_V_RADKU;

            for (int i = 0; i < POCET_KARET_V_RADKU; i++)
            {
                for (int j = 0; j < POCET_KARET_V_RADKU; j++)
                {
                    int poradi = POCET_KARET_V_RADKU * i + j;

                    Button b = new Button();

                    if (pohyb)
                        b.Tag = new Tag(zamichane[poradi], rnd.Next(-maxRychlost, maxRychlost), rnd.Next(-maxRychlost, maxRychlost));
                    else
                        b.Tag = new Tag(zamichane[poradi], 0, 0);

                    b.Width = sx;
                    b.Height = sy;
                    b.Left = i * sx + BOCNI_OKRAJ + i * ROZESTUPY;
                    b.Top = j * sy + HORNI_OKRAJ + j * ROZESTUPY;
                    b.Text = TEXT_RUBU;
                    //b.Tag = zamichane[poradi];
                    b.Name = (j * POCET_KARET_V_RADKU + i).ToString();
                    b.Parent = this;
                    b.Click += klikNaKarticku;
                    b.Font = new Font("Franklin Gothic Demi Cond", 14f, FontStyle.Regular);
                    karticky[poradi] = b;
                }
            }
        }
        void odstranKarticky()
        {
            for (int i = 0; i < POCET_KARET; i++)
            {
                odstranKarticku(karticky[i]);
            }
        }

        int[] zamichej(int[] nums)
        {
            for (int i = 0; i < nums.Length; i++)
            {
                int tmp = nums[i];
                int r = rnd.Next(i, nums.Length);
                nums[i] = nums[r];
                nums[r] = tmp;
            }
            return nums;
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void BStart_Click(object sender, EventArgs e)
        {
            pohyb = true;
            NastavStav(STAV.HRA);
        }

        private void label1_Click_1(object sender, EventArgs e)
        {

        }

        private Label vytvorDebugLabel()
        {
            Label d = new Label();
            d.Text = "";
            d.Top = 0;
            d.Left = 0;
            d.Parent = this;
            return d;
        }

        private void LPocetDvojic_Click(object sender, EventArgs e)
        {

        }

        private void LPocetTahu_Click(object sender, EventArgs e)
        {

        }

        private void BKonec_Click(object sender, EventArgs e)
        {
            odstranKarticky();
            BRestart_Click(sender, e);

        }

        private void BRestart_Click(object sender, EventArgs e)
        {
            NastavStav(STAV.START);
            pocetBodu = 0;
            pocetTahu = 0;
            aktualizujPocty(pocetTahu, pocetBodu);
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (pohyb)
            {
                for (int i = 0; i < POCET_KARET_V_RADKU * POCET_KARET_V_RADKU; i++)
                {
                    if (karticky[i] != null)
                    {
                        Button k = karticky[i];
                        Tag t = karticky[i].Tag as Tag;
                        if (k.Left <= VZDALENOST_HRANICE_OD_OKRAJE || k.Right >= this.ClientRectangle.Width - VZDALENOST_HRANICE_OD_OKRAJE)
                            t.rychlostX *= -1;
                        if (k.Top <= HORNI_OKRAJ - maxRychlost || k.Bottom >= this.ClientRectangle.Height - VZDALENOST_HRANICE_OD_OKRAJE)
                            t.rychlostY *= -1;

                        k.Left += t.rychlostX;
                        k.Top += t.rychlostY; // tady jsem skoncila
                    }
                }
            }
        }

        private void label1_Click_2(object sender, EventArgs e)
        {

        }

        private void BStaticka_Click(object sender, EventArgs e)
        {
            pohyb = false;
            NastavStav(STAV.HRA);
        }
    }
}

class Tag
{
    public int cislo;
    public int rychlostX;
    public int rychlostY;

    public Tag(int c, int rx, int ry)
    {
        cislo = c;
        rychlostX = rx;
        rychlostY = ry;
    }
}