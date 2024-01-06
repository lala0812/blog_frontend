#!/bin/sh


# Recreate config file
rm -rf $1
touch $1

# Add assignment
echo "window._env_ = {" >> $1

# get printenv
printenv | while read -r line || [[ -n "$line" ]];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    #if varname matche prefix REACT_APP_
      if [[ $varname =~ ^REACT_APP_ ]]; then
          # Append configuration property to JS file
          echo "  $varname: \"$varvalue\"," >> $1
      fi
  fi

  # Read value of current variable if exists as Environment variable
  #value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  #[[ -z $value ]] && value=${varvalue}
done

echo "}" >> $1

nginx -g "daemon off;"