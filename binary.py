import random

# Crear una lista de números del 1 al 10 (o cualquier rango que desees)
numeros = list(range(1, 11))

# Mezclar los números de manera aleatoria
random.shuffle(numeros)

def binary(array,value):
    thisArray = sorted(array)
    min = 0
    max = len(array)-1
    print(thisArray)

    while min < max:
        mid = (min + max) // 2
        if thisArray[mid] == value:
            return mid
        elif thisArray[mid] < value:
            min = mid + 1
        else:
            max = mid - 1

    return -1  # Elemento no encontrado

result = binary(numeros,8)
print(result)
