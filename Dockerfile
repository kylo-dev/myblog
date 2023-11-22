FROM ubuntu:latest
LABEL authors="rlagu"

ENTRYPOINT ["top", "-b"]