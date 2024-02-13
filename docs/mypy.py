import sys, math
sys.setrecursionlimit(10**9)
input = sys.stdin.readline

T = list(input())
P = list(input())

N = len(T)-1
M = len(P)-1

table = [0 for _ in range(M)]

j = 0
for i in range(1, M):
    while(j > 0 and P[i] != P[j]):
        j = table[j-1]
    if(P[i] == P[j]):
        j+=1
        table[i] = j

ans = []
j = 0
for i in range(N):
    while(j > 0 and T[i] != P[j]):
        j = table[j-1]
    if T[i] == P[j]:
        if j == M-1:
            ans.append(i-M+2)
            j = table[j]
        else:
            j+=1
    
print(len(ans))
for i in ans:
    print(i)