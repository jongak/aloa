from scipy.optimize import fsolve

def f(x, y):
    return 2 * x ** 3 + y ** 3 + x * y - 6

def g(x, y):
    return x ** 3 - y ** 3 + x * y - 4

# 초기 추정치 설정
initial_guess = [1, 1]

# 연립 방정식의 해를 찾기 위해 fsolve 함수 사용
solution = fsolve(lambda xy: [f(xy[0], xy[1]), g(xy[0], xy[1])], initial_guess)

print("x =", solution[0])
print("y =", solution[1])

print(f(1.4195854493300972,0.3890631854729336))