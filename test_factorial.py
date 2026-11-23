"""Tests for the factorial function."""

import pytest
from factorial import factorial


class TestFactorial:
    """Test suite for factorial function."""

    def test_factorial_of_zero(self):
        """Test that factorial(0) returns 1."""
        assert factorial(0) == 1

    def test_factorial_of_one(self):
        """Test that factorial(1) returns 1."""
        assert factorial(1) == 1

    def test_factorial_of_two(self):
        """Test that factorial(2) returns 2."""
        assert factorial(2) == 2

    def test_factorial_of_five(self):
        """Test that factorial(5) returns 120."""
        assert factorial(5) == 120

    def test_factorial_of_ten(self):
        """Test that factorial(10) returns 3628800."""
        assert factorial(10) == 3628800

    def test_factorial_of_seven(self):
        """Test that factorial(7) returns 5040."""
        assert factorial(7) == 5040

    def test_factorial_negative_raises_error(self):
        """Test that factorial of negative number raises ValueError."""
        with pytest.raises(ValueError):
            factorial(-1)

    def test_factorial_float_raises_error(self):
        """Test that factorial of float raises TypeError."""
        with pytest.raises(TypeError):
            factorial(5.5)

    def test_factorial_string_raises_error(self):
        """Test that factorial of string raises TypeError."""
        with pytest.raises(TypeError):
            factorial("5")

    def test_factorial_large_number(self):
        """Test factorial of a larger number."""
        # 15! = 1307674368000
        assert factorial(15) == 1307674368000


if __name__ == "__main__":
    pytest.main([__file__, "-v"])