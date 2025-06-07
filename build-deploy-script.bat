@echo off
setlocal enabledelayedexpansion

@REM Create .cpanel.yml deployment file:

@REM ====================== SAMPLE ======================
@REM ---
@REM deployment:
@REM   tasks:
@REM     - export DEPLOYPATH=/home/chnsoftw/himashana.me/
@REM     - /bin/cp index.html $DEPLOYPATH
@REM     - /bin/cp .htaccess $DEPLOYPATH
@REM ====================== SAMPLE ======================

echo Buiding script...

:: Deployment target directory
set DEPLOYPATH=/home/chnsoftw/himashana.me/

:: Ignored items (space padded for findstr matching)
set "IGNORED_ITEMS= .cpanel.yml .git .gitignore .vscode .gitattributes README.md build-deploy-script.bat .github "

:: Start the .cpanel.yml file
(
    echo ---
    echo deployment:
    echo   tasks:
    echo     - export DEPLOYPATH=%DEPLOYPATH%
) > .cpanel.yml

:: Loop through all files and directories in the current directory
for /f "delims=" %%A in ('dir /b /a') do (
    set "ITEM=%%A"

    echo !IGNORED_ITEMS! | findstr /c:" !ITEM! " >nul
    if errorlevel 1 (
        if exist "%%A\" (
            :: If it's a directory
            echo Adding directory: %%A
            echo     - /bin/cp -R %%A $DEPLOYPATH >> .cpanel.yml
        ) else (
            :: If it's a file
            echo Adding file: %%A
            echo     - /bin/cp %%A $DEPLOYPATH >> .cpanel.yml
        )
    ) else (
        echo Ignoring: %%A
    )
)

echo Script built successfully.