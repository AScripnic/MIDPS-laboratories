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
            checkIfErrored();
            displayLabel.addDigitOrDot((sender as Button).Text);
        }

        private void clear(object sender, EventArgs e)
        {
            displayLabel.resetLabel();
            calc.clearExpression();
            calc.value = 0;
        }

        private void delete(object sender, EventArgs e)
        {

            checkIfErrored();
            displayLabel.deleteLastChar();
        }

        private void toggleSign(object sender, EventArgs e) {
            displayLabel.toggleSign();
        }

        private void setExpression(object sender, EventArgs e) {
            checkIfErrored();

            calc.executeExpression(displayLabel.toDouble());
            calc.setExpression((sender as Button).Text);
            displayLabel.resetLabel();
        }

        private void showResult(object sender, EventArgs e) {
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
    }
}
