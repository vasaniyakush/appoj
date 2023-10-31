export const IP = "localhost"


//Please add respective items to add a new lang
export const langs = [
    "c_cpp",
    "c_cpp",
    "java",
    "python",
]
export const langs_ids = [
    49,
    54,
    62,
    71,
]

export const lang_extn = [
    "c",
    "cpp",
    "java",
    "py"
]


export const defaultCode ={
    "C":`#include<stdio.h>
    int main(){
        printf("Hello World!!");
    }`,
    
    "CPP":`#include<bits/stdc++.h>
using namespace std;
int main(){
    cout<<"Hello World!!";
    return 0;
}`,
"JAVA":`public class Main{
    public static void main(String[] args){
        System.out.println("Hello");
    }
}`,
"PYTHON":`str = "Hello World!!!"
print(str)`
}


export const statuses = [
    "In Queue",
    "Processing",
    "Accepted",
    "Wrong Answer",
    "Time Limit Exceeded",
    "Compilation Error",
    "Runtime Error (SIGSEGV)",
    "Runtime Error (SIGXFSZ)",
    "Runtime Error (SIGFPE)",
    "Runtime Error (SIGABRT)",
    "Runtime Error (NZEC)",
    "Runtime Error (Other)",
    "Internal Error",
    "Exec Format Error",
  ];