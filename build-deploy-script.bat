@echo off

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

echo --- > .cpanel.yml
echo deployment: >> .cpanel.yml
echo   tasks: >> .cpanel.yml
echo     - export DEPLOYPATH=/home/chnsoftw/himashana.me/ >> .cpanel.yml

@REM Ignored files and folders list
set IGNORED_ITEMS= .cpanel.yml .git .gitignore .vscode .gitattributes .gitignore README.md build-deploy-script.bat

@REM Get all the files in the root folder and write in this script
for /r %%i in (*) do (
    set "FILE=%%~nxi"
    echo %IGNORED_ITEMS% | findstr /c:" %%~nxi " >nul
    if errorlevel 1 (
        echo %%i | findstr /c:"\\\.git\\" /c:"\\\.vscode\\" >nul
        if errorlevel 1 (
            set "REL_PATH=%%i"
            setlocal enabledelayedexpansion
            set "REL_PATH=!REL_PATH:%CD%\=!" 
            echo writing !REL_PATH!
            echo     - /bin/cp !REL_PATH! $DEPLOYPATH >> .cpanel.yml
            endlocal
        )
    )
)

echo Script built successfully.