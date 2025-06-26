#include<stdio.h>

int main(int argc, char* argv[]){//number of  arg, array of arguments each element of this array is a string pointer
    for(int i=0; i<argc; i++){
        printf("Argument %d is: %s\n", i, argv[i]);
    }

    return 0;
}