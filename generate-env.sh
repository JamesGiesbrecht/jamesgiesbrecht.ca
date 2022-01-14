# EX: sh generate-env.sh REACT_APP_FOO=bar

FILENAME='.env'
touch $FILENAME

for envvar in "$@"
do
  echo "\n$envvar" >> $FILENAME
done
