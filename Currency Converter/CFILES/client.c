#include<stdio.h>
#include<string.h>
#include<unistd.h>
#include<netinet/in.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<stdlib.h>
#include<netdb.h>

void error(const char *msg) {
        perror(msg);
        exit(0);
}
int main(int argc,char *argv[]) {
        int sockfd,Portno,n;
        struct sockaddr_in serv_addr;
        struct hostent *server;

        char buffer[255];
        if(argc <3 ) {
                fprintf(stderr,"usage %s hostname port\n",argv[0]);
                exit(1);
        }
        Portno = atoi(argv[2]);

        sockfd = socket(AF_INET,SOCK_STREAM,0);
        if(sockfd < 0) {
                error("error in opening the socket");
        }
        server = gethostbyname(argv[1]);
        if(server == NULL) {
                fprintf(stderr,"Error,no such host or wrong ip");
        }
        bzero((char *) &serv_addr,sizeof(serv_addr));

        serv_addr.sin_family = AF_INET;
        bcopy((char * ) server->h_addr,(char *) &serv_addr.sin_addr.s_addr,server->h_length);
        serv_addr.sin_port = htons(Portno);
        if(connect(sockfd,(struct sockaddr *) &serv_addr,sizeof(serv_addr)) < 0) {
                error("connection failed");
        }
        while(1) {
        bzero(buffer,255);
        fgets(buffer,255,stdin);
        n = write(sockfd,buffer,strlen(buffer));
        if(n < 0) {
                error("Error in writing to the server");
        }
                bzero(buffer,255);
                n = read(sockfd,buffer,255);
                if(n<0) {
                        error("Error in reading from the server");
                        }
                printf("Server : %s",buffer);
                int i = strncmp("bye",buffer,3);
                if(i==0) {
                break;

                }
        }
                close(sockfd);
                return 0;

}

~               