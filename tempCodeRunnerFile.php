<?php

//  I took inspiration for php code after writing javascript code only
//  syntax is changed but the logic remains the same


echo "Please enter the name of the file: ";
$inputFile = trim(fgets(STDIN));

removeComments($inputFile);

function removeComments($input_file) {
    $outputFile = "./output.c";
    // Check if the file exists before attempting to read it
    if (!file_exists($input_file)) {
        echo "Error: File does not exist.\n";
        return;
    }

    // Read the file content
    $fileText = file_get_contents($input_file);

    // Regex pattern to match valid single-line and multi-line comments
    $text = preg_replace('/\/\/.*?\n|\/\*[\s\S]*?\*\//m', '', $fileText);
    echo $text . "\n";

    // Split the text into lines for further processing
    $newTextLines = explode("\n", $text);
    $fileTextLines = explode("\n", $fileText);
    $invalidCommentArray = [];

    foreach ($newTextLines as $index => $line) {
        if (preg_match('/\/\*|\*\//', $line)) {
            $invalidCommentArray[] = $line;
        }
    }
    foreach ($fileTextLines as $index => $line) {
        if (in_array($line, $invalidCommentArray)) {
            echo "Error: invalid comment on input file line number " . ($index + 1) . "\n";
            echo "Line is :-----> " . $line . "\n";
        }
    }
    // Write the modified content to the output file
    if (file_put_contents($outputFile, $text) === false) {
        echo "Error: Could not write to output file.\n";
    } else {
        echo "Comments removed successfully.\n";
    }
}