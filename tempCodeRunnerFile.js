        const invalidCommentArray = [];
        const newText = text.split("\n");

        console.log(newText)
        newText.forEach((line, index) => {
            if (/\/\*|\*\//.test(line)) {
                invalidCommentArray.push(line);
            }
        });