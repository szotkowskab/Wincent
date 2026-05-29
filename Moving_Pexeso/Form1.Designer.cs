namespace Pexeso
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            BStart = new Button();
            BKonec = new Button();
            BRestart = new Button();
            LNadpis = new Label();
            LPocetTahu = new Label();
            LPocetBodu = new Label();
            LVysledek = new Label();
            LGratulace = new Label();
            timer1 = new System.Windows.Forms.Timer(components);
            LZadani = new Label();
            LStaticka = new Label();
            BStaticka = new Button();
            SuspendLayout();
            // 
            // BStart
            // 
            BStart.Font = new Font("Franklin Gothic Demi Cond", 24F);
            BStart.Location = new Point(428, 379);
            BStart.Margin = new Padding(4);
            BStart.Name = "BStart";
            BStart.Size = new Size(136, 56);
            BStart.TabIndex = 0;
            BStart.Text = "Start";
            BStart.TextImageRelation = TextImageRelation.ImageAboveText;
            BStart.UseVisualStyleBackColor = true;
            BStart.Click += BStart_Click;
            // 
            // BKonec
            // 
            BKonec.Font = new Font("Franklin Gothic Demi Cond", 14F);
            BKonec.Location = new Point(160, 38);
            BKonec.Margin = new Padding(4);
            BKonec.Name = "BKonec";
            BKonec.Size = new Size(129, 41);
            BKonec.TabIndex = 1;
            BKonec.Text = "Konec";
            BKonec.UseVisualStyleBackColor = true;
            BKonec.Click += BKonec_Click;
            // 
            // BRestart
            // 
            BRestart.Font = new Font("Franklin Gothic Demi Cond", 14F);
            BRestart.Location = new Point(339, 429);
            BRestart.Margin = new Padding(4);
            BRestart.Name = "BRestart";
            BRestart.Size = new Size(314, 41);
            BRestart.TabIndex = 2;
            BRestart.Text = "Zpět na úvodní obrazovku";
            BRestart.UseVisualStyleBackColor = true;
            BRestart.Click += BRestart_Click;
            // 
            // LNadpis
            // 
            LNadpis.AutoSize = true;
            LNadpis.Font = new Font("Franklin Gothic Heavy", 42F);
            LNadpis.Location = new Point(140, 186);
            LNadpis.Margin = new Padding(4, 0, 4, 0);
            LNadpis.Name = "LNadpis";
            LNadpis.Size = new Size(713, 88);
            LNadpis.TabIndex = 4;
            LNadpis.Text = "POHYBLIVÉ PEXESO!";
            LNadpis.Click += label1_Click;
            // 
            // LPocetTahu
            // 
            LPocetTahu.AutoSize = true;
            LPocetTahu.Font = new Font("Franklin Gothic Demi Cond", 14F);
            LPocetTahu.Location = new Point(709, 44);
            LPocetTahu.Margin = new Padding(4, 0, 4, 0);
            LPocetTahu.Name = "LPocetTahu";
            LPocetTahu.Size = new Size(131, 30);
            LPocetTahu.TabIndex = 5;
            LPocetTahu.Text = "Počet tahů: 0";
            LPocetTahu.Click += LPocetTahu_Click;
            // 
            // LPocetBodu
            // 
            LPocetBodu.AutoSize = true;
            LPocetBodu.Font = new Font("Franklin Gothic Demi Cond", 14F);
            LPocetBodu.Location = new Point(433, 44);
            LPocetBodu.Margin = new Padding(4, 0, 4, 0);
            LPocetBodu.Name = "LPocetBodu";
            LPocetBodu.Size = new Size(135, 30);
            LPocetBodu.TabIndex = 6;
            LPocetBodu.Text = "Počet bodů: 0";
            LPocetBodu.Click += LPocetDvojic_Click;
            // 
            // LVysledek
            // 
            LVysledek.Font = new Font("Verdana Pro Black", 60F, FontStyle.Bold);
            LVysledek.ImageAlign = ContentAlignment.TopCenter;
            LVysledek.Location = new Point(196, 218);
            LVysledek.Margin = new Padding(4, 0, 4, 0);
            LVysledek.Name = "LVysledek";
            LVysledek.Size = new Size(600, 121);
            LVysledek.TabIndex = 7;
            LVysledek.Text = "0";
            LVysledek.TextAlign = ContentAlignment.MiddleCenter;
            LVysledek.Click += label4_Click;
            // 
            // LGratulace
            // 
            LGratulace.AutoSize = true;
            LGratulace.Font = new Font("Franklin Gothic Heavy", 18F, FontStyle.Regular, GraphicsUnit.Point, 0);
            LGratulace.Location = new Point(279, 129);
            LGratulace.Margin = new Padding(4, 0, 4, 0);
            LGratulace.Name = "LGratulace";
            LGratulace.Size = new Size(435, 38);
            LGratulace.TabIndex = 8;
            LGratulace.Text = "Gratuluji k výhře! Vaše skóre:";
            LGratulace.Click += label5_Click;
            // 
            // timer1
            // 
            timer1.Tick += timer1_Tick;
            // 
            // LZadani
            // 
            LZadani.AutoSize = true;
            LZadani.Font = new Font("Franklin Gothic Heavy", 8F);
            LZadani.Location = new Point(305, 274);
            LZadani.Name = "LZadani";
            LZadani.Size = new Size(382, 18);
            LZadani.TabIndex = 9;
            LZadani.Text = "možná nesplňuje zadání, ale doufám, že vám zlepší den :)";
            LZadani.Click += label1_Click_2;
            // 
            // LStaticka
            // 
            LStaticka.AutoSize = true;
            LStaticka.Font = new Font("Franklin Gothic Demi", 6F, FontStyle.Regular, GraphicsUnit.Point, 0);
            LStaticka.Location = new Point(698, 543);
            LStaticka.Name = "LStaticka";
            LStaticka.Size = new Size(209, 14);
            LStaticka.TabIndex = 10;
            LStaticka.Text = "...nebo můžete spustit trapnou statickou verzi:";
            // 
            // BStaticka
            // 
            BStaticka.Font = new Font("Franklin Gothic Heavy", 6F);
            BStaticka.Location = new Point(913, 539);
            BStaticka.Name = "BStaticka";
            BStaticka.Size = new Size(44, 22);
            BStaticka.TabIndex = 11;
            BStaticka.Text = "Start";
            BStaticka.UseVisualStyleBackColor = true;
            BStaticka.Click += BStaticka_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(11F, 28F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(992, 566);
            Controls.Add(BStaticka);
            Controls.Add(LStaticka);
            Controls.Add(LZadani);
            Controls.Add(LGratulace);
            Controls.Add(LVysledek);
            Controls.Add(LPocetBodu);
            Controls.Add(LPocetTahu);
            Controls.Add(LNadpis);
            Controls.Add(BRestart);
            Controls.Add(BKonec);
            Controls.Add(BStart);
            Font = new Font("Segoe UI", 12F);
            Margin = new Padding(4);
            Name = "Form1";
            Text = "PEXESO";
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button BStart;
        private Button BKonec;
        private Button BRestart;
        private Label LNadpis;
        private Label LPocetTahu;
        private Label LPocetBodu;
        private Label LVysledek;
        private Label LGratulace;
        private System.Windows.Forms.Timer timer1;
        private Label LZadani;
        private Label LStaticka;
        private Button BStaticka;
    }
}
