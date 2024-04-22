echo "start check version"
versionBuild = jq '.version'  package.json 
echo "VERSION: $versionBuild"
export DMF_VERSION=$versionBuild