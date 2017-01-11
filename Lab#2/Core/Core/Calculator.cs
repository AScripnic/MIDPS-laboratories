using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class Calculator : Operations
    {
        private string expression = null;

        public void setExpression(string value)
        {
            expression = value;
        }

        private void setValue(double value)
        {
            this.value = value;
        }

        public void clearExpression()
        {
            expression = null;
        }

        public void executeExpression(double value)
        {
            switch (expression)
            {
                case "√": sqrt(); break;
                case "x^y": power(value); break;
                case "/": devide(value); break;
                case "×": multiply(value); break;
                case "-": substract(value); break;
                case "+": sum(value); break;
                case null: setValue(value); break;
            }
        } 
    }
}
