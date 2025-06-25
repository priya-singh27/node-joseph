#include<stdio.h>
#include<stdlib.h>

int main(){
    
    int a = 10;

    int* mypointer = &a;

    // printf("%p\n",mypointer);
    // printf("%d\n",*mypointer);

    int* allocatedMemory = malloc(12);

    for(int i=0; i<3; i++){//int is 4 bytes and we have 12 boxesso in total 3 different integer values
        allocatedMemory[i]=1937208183;
    }

    for(int i=0;i<3;i++){
        printf("Number is: %d\n", allocatedMemory[i]);
    }
    

    return 0;
}