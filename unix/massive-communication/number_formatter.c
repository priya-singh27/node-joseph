#include<stdio.h>
#include<stdlib.h>//exit()
#include<string.h>

char* formatNumber(char* input, char begin, char divider){
    int length = strlen(input);

    //length + no of dividers + 1 for begin sign + 1 for null terminator
    int formattedLength = length+ length/3 +2;

    char* formattedNumber = (char*)malloc(formattedLength*(sizeof(char)));

    int j=0;
    int commaCount = length%3;//determine where the first divider should be placed

    formattedNumber[0] = begin;
    j = j+1;

    for(int i=0; i<length; i++){
        formattedNumber[j] = input[i];
        j++;

        if(commaCount>0 && i<length-1 &&(i+1)%3 == commaCount){
            formattedNumber[j++] = divider;
        }else if(commaCount==0 && i<length-1 && (i+1)%3 == 0){
            formattedNumber[j++] = divider;
        }
    }

    formattedNumber[j] = '\0';

    return formattedNumber;
} 

int main(int argc, char* argv[]){
    //open a file for writing
    FILE *outputFile = fopen(argv[1], "w");

    //Allocate memory to save one complete number into
    char *number = (char *)malloc(10*sizeof(char));
    int idx =0;

    //reaad one character from stdin, fgetc reads one byte at a time and returns int type
    int c = fgetc(stdin);

    //keep reading until we get the "End of File" sign
    while (c != EOF)
    {
        if(c != ' '){
            number[idx] = c;
            idx++;
        }
        if(c == ' '){
            if(idx>0){
                //null terminator because without this string is just array of characters
                number[idx] = '\0';

                //Format the number that we just read
                char* formattedNumber = formatNumber(number, argv[2][0], argv[3][0]);

                //Write to our destination stream
                fprintf(outputFile, "%s", formattedNumber);//data is stored in a buffer first (temporary)
                // fflush(outputFile);//fflush forces write Without fflush(), the characters would stay in a buffer until: buffer is full, or file is closed or process ends

                //Resetting...
                idx=0;
                free(formattedNumber);
            }
        }

        //read next character from stdin
        c = fgetc(stdin);
    }

    //Close the opened file that we worte to
    fclose(outputFile);

    exit(0);//ctrl+d makes you exit the process
}