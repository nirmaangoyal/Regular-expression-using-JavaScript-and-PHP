const fs = require('fs');
const readline = require('readline');
const output_file = "./output.c";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the name of the file: ', function(input_file) {
    removeComments(input_file);
    rl.close();
});

function removeComments(inputFile) {
    fs.readFile(inputFile, 'utf8', (err, inputfile) => {
        if (err) {
            console.error(err);
            return;
        }
        // Replace vaild comment with ''
        // g- global flag so that the replace function replaces every instacne not just the first instance it can find
        // m - is multiline flag
        const text = inputfile.replace(/\/\/.*?\n|\/\*[\s\S]*?\*\//gm, '');
        // console.log(text);

        // Find the invalid comments
        const invalidComments = [];
        const newText = text.split("\n");
        // console.log(newText)
        newText.forEach((line, index) => {
            if (/\/\*|\*\//.test(line)) {
                invalidComments.push(line);
                // console.log(invalidComments);

            }
        });
        // This function finds the invalid comment line from the orignal file to get its index
        text.split("\n").forEach((line, index) => {
            // console.log(line)
            if (invalidComments.includes(line)) {
                console.error(`Error: invalid comment on input file line number ${index + 1}`);
                console.error(`Line is :-----> ${line}`);
            }
        });

        // Write to output.c with comments removed
        fs.writeFile(output_file, text, 'utf8', (err) => {
            if (err) {
                console.error(err);
                return; 
            }
            console.log('Comments removed successfully.');
        });
    });
}


