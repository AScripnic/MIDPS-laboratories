using System;

namespace Core
{
    public class Operations
    {
        public double value = 0;

        public void sum(double value)
        {
            this.value += value;
        }

        public void substract(double value)
        {
            this.value -= value;
        }

        public void multiply(double value)
        {
            this.value *= value;
        }

        public void devide(double value)
        {
            this.value /= value;
        }

        public void power(double value)
        {
            this.value = Math.Pow(this.value, value);
        }

        public void sqrt()
        {
            value = Math.Sqrt(value);
        }

        public void changeSign() {
            value = -value;
        }

        public void mod(double value)
        {
            value %= value;
        }
    }
}
