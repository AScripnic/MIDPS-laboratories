using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class Calculator : Operations
    {
        private string expression;

        public void setExpression(string value)
        {
            expression = value;
        }

        private void setValue(double value)
        {
            this.value = value;
        }

        public void executeExpression(double value)
        {
            switch (expression)
            {
                case "√": sqrt(value); break;
                case "x^y": power(value); break;
                case "÷": mod(value); break;
                case "×": multiply(value); break;
                case "-": substract(value); break;
                case "+": sum(value); break;
                default: setValue(value); break;
            }
        } 
    }
}
