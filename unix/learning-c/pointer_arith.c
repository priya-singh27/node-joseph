#include<stdio.h>
#include<string.h>

int main(void){
    char arr[] = "12345";
    char * parr= arr;

    for(int i=0; i<strnlen(arr, sizeof(arr)); i++){
        printf("arr[%d] = %c *(parr+%d)=%c &arr[%d]=%p parr+%d=%p\n",
            i,
            arr[i],
            i, 
            *(parr+i),
            i,
            &arr[i],
            i,
            parr+i
        );
    }

    return 0;
}