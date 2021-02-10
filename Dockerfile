FROM openjdk:11 AS builder

COPY . bounties
WORKDIR /bounties

RUN ./gradlew clean bootJar -x test

# RUN ls
# COPY build/libs/bounties*.jar bounties.jar

ENTRYPOINT ["java","-jar","build/libs/bounties*.jar"]
