#!/bin/bash
#
# Currently builds the site
LOGFILE="../build_log.txt"
SITE_DIR="site"
BUILD_CMD="roots compile"
INSTALL_PACKAGE_CMD="yarn"
INSTALL_PACKAGE_CMD_DEFAULT="npm install"

cd $SITE_DIR
echo "" > $LOGFILE

echo "=====================================================" | tee -a $LOGFILE
echo "Running site build at $(date)." | tee -a $LOGFILE
echo "=====================================================" | tee -a $LOGFILE

echo "Pulling latest updates from remote repository..." | tee -a $LOGFILE
git pull | tee -a $LOGFILE

echo "Installing packages..." | tee -a $LOGFILE

# Check if new package manager is available and use it. Fallback to npm
which $INSTALL_PACKAGE_CMD
if [ "$?" == "0" ]; then
	$INSTALL_PACKAGE_CMD
else
	$INSTALL_PACKAGE_CMD_DEFAULT
fi

# Check installation of packages
if [ "$?" != "0" ]; then
	echo "Error: There was an error fetching packages..." | tee -a $LOGFILE
	exit 1
else
	echo "Done installing packages!" | tee -a $LOGFILE
fi

echo "Building site..." | tee -a $LOGFILE
$BUILD_CMD
if [ "$?" != "0" ]; then
	echo "Error: There was a problem compiling site..." | tee -a $LOGFILE
	exit 1
else
	echo "Build site successful!" | tee -a $LOGFILE
fi

echo "====================================================" | tee -a $LOGFILE
echo "Done" | tee -a $LOGFILE
echo "====================================================" | tee -a $LOGFILE
echo "" | tee -a $LOGFILE
echo "" | tee -a $LOGFILE

exit 0