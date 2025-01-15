using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InterfacciaOrdinamentoPiuCampi
{
    internal class Persona
    {
        public string nome;
        public string citta;

        public Persona(string nome, string citta)
        {
            this.nome = nome;
            this.citta = citta;
        }

        public class confrontaNome : IComparer<Persona> 
        {
            public int Compare(Persona p1, Persona p2) 
            {
                if (p1 == null && p2 == null) return 0;
                else if (p1 == null) return 1;
                else if (p2 == null) return -1;
                else
                {
                    return string.Compare(p1.nome, p2.nome, true);
                }
            }
        }

        public class confrontaCitta : IComparer<Persona>
        {
            public int Compare(Persona p1, Persona p2)
            {
                if (p1 == null && p2 == null) return 0;
                else if (p1 == null) return 1;
                else if (p2 == null) return -1;
                else
                {
                    return string.Compare(p1.citta, p2.citta, true);
                }
            }
        }
    }
}
