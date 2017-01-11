using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Core
{
    public class ExtendedLabel : Label
    {

        public void resetLabel()
        {
            Text = "0";
        }

        public void addDigitOrDot(string digit) {
            if (digit == "." && (Text.IndexOf('.') > -1 || Text == "0")) {
                return;
            }

            if (Text == "0")
            {
                Text = digit;
            }
            else
            {
                Text += digit;
            }
        } 

        public void deleteLastChar() {

            if ((Text != "0" && Text.Length == 1) || (Text[0] == '-' && Text.Length == 2))
            {
                resetLabel();
            }
            else if (Text.Length > 1)
            {
                Text = Text.Remove(Text.Length - 1, 1);
            }

            if (Text[Text.Length - 1] == '.') {
                deleteLastChar();
            }
        }

        public void toggleSign()
        {
            if (Text == "0") {
                return;
            }

            if (Text[0] == '-')
            {
                Text = Text.Remove(0, 1);
            }
            else
            {
                Text = Text.Insert(0, "-");
            }
        }

        public void setValue(double value)
        {
            Text = value.ToString().Replace(',', '.');
        }

        public double toDouble() {
            return double.Parse(Text, System.Globalization.CultureInfo.InvariantCulture);
        }

    }
}
