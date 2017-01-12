using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Core;

namespace GUI
{
    public partial class Form1 : Form
    {
        private Calculator calc = new Calculator();

        public Form1()
        {
            InitializeComponent();
        }

        private void addDigit(object sender, EventArgs e)
        {
            label1.Select();
            checkIfErrored();
            displayLabel.addDigitOrDot((sender as Button).Text);
        }

        private void clear(object sender, EventArgs e)
        {
            label1.Select();
            displayLabel.resetLabel();
            calc.clearExpression();
            calc.value = 0;
        }

        private void delete(object sender, EventArgs e)
        {
            label1.Select();
            checkIfErrored();
            displayLabel.deleteLastChar();
        }

        private void toggleSign(object sender, EventArgs e) {
            label1.Select();
            displayLabel.toggleSign();
        }

        private void setExpression(object sender, EventArgs e) {
            label1.Select();
            checkIfErrored();

            calc.executeExpression(displayLabel.toDouble());
            calc.setExpression((sender as Button).Text);
            displayLabel.resetLabel();
        }

        private void showResult(object sender, EventArgs e) {
            label1.Select();
            checkIfErrored();

            calc.executeExpression(displayLabel.toDouble());
            calc.clearExpression();
            displayLabel.setValue(calc.value);
        }

        private void checkIfErrored()
        {
            if (calc.isErrored)
            {
                calc.value = 0;
                displayLabel.resetLabel();
                MessageBox.Show("You've got to the end of univers(double size). Hope you haven't tried to devide 0 by 0 -.-");
            }
        }

        private void keyPress(object sender, KeyPressEventArgs e)
        {
            int number;
            string key = e.KeyChar.ToString();
            Button button = new Button();

            button.Text = key;

            if (int.TryParse(key, out number) || key == ".")
            {
                addDigit(button, e);
                return;
            }

            if (e.KeyChar == (char)13)
            {
                showResult(button, e);
                return;
            }

            switch(key)
            {
                case "+":
                case "-":
                case "*":
                case "/": setExpression(button, e); break;
                case "\b": delete(button, e); break;
                case "=": showResult(button, e); break;
            }
        }
    }
}
