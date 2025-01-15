using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace InterfacciaOrdinamentoPiuCampi
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            Persona[] vet = new Persona[]  
            { 
                new Persona("Mario Rossi", "Fossano"),
                new Persona("Enrico Bonavia", "Alba"),
                new Persona("Beatrice Giaccardi", "Salmour")
            };

            Array.Sort(vet, new Persona.confrontaNome());

            string s = "";

            foreach (Persona p in vet)
            {
                s += p.nome + "\n";
            }

            MessageBox.Show(s);

            Array.Sort(vet, new Persona.confrontaCitta());

            s = "";

            foreach (Persona p in vet)
            {
                s += p.citta + "\n";
            }

            MessageBox.Show(s);
        }
    }
}
