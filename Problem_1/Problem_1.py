def sum_to_n_a(n):
    sum = 0

    for i in range(1,n+1):
        sum += i

    return sum


def sum_to_n_b(n):
    # If n is even
    if n%2 == 0:
        return int(n/2) * (n+1)
    # If n is odd
    else:
        return n//2 * (n+1) + int((n+1)/2)

def sum_to_n_c(n):
    hash_map = {}

    def helper(n):
        if n == 0:
            return 0

        if n in hash_map:
            return hash_map.get(n)

        return helper(n-1) + n

    return helper(n)


n = 101
print(sum_to_n_a(n))
print(sum_to_n_b(n))
print(sum_to_n_c(n))

