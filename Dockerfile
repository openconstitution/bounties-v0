FROM openjdk:11 AS builder

COPY . bounties
WORKDIR /bounties

RUN ./gradlew clean bootJar -x test

# RUN ls
# COPY build/libs/bounties*.jar bounties.jar

# ENTRYPOINT ["java","-jar","build/libs/bounties*.jar"]


FROM gcr.io/distroless/java:11 as bounties

COPY --from=builder /bounties/target/BOOT-INF/lib /app/lib
COPY --from=builder /bounties/target/META-INF /app/META-INF
COPY --from=builder /bounties/target/BOOT-INF/classes /app

ENTRYPOINT ["java", "-cp", "app:app/lib/*", "org.muellners.bounties.BountiesApp"]
