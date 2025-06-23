alias priya="echo 'Priya is my friend!'"

myvar="Script.js"

myfunc(){
    echo $myvar
    x=10
    y=10
    ((sum=x+y))
    echo $sum
    echo $1 | tr ' ' '\n'
}

myfunc "This is a string"
