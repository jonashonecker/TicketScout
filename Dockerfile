FROM --platform=linux/amd64 openjdk:22
EXPOSE 8080
ADD backend/target/ticketscout.jar ticketscout.jar
ENTRYPOINT ["java", "-jar", "ticketscout.jar"]