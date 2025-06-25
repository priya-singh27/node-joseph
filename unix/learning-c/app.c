#include <stdio.h>

int add(int a, int b){
    return a+b;
}

int main() {
    size_t t= 2; 
    printf("Address of t is: %p\n", &t);
    for(int i=0;i <sizeof(size_t); i++){
        printf("Address of byte %d is: %p. And it's value is: %hhu \n", i, (void *)((char *)&t+i), *(((char *)&t+i)));
    }

    // int sum = add(2,3);
    // size_t t = 0;//8 bytes

    // sizeof(int);

    // fprintf(stdout, "This size of int type is: %ld bytes\n", sizeof(long long));

    return 0;//process exit code
}