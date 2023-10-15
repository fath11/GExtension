var i = 0;
var contents = []
function duplicateDiv() {
  var myDiv = document.getElementById("block");
  var divClone = myDiv.cloneNode(true); // deep cloning
  divClone.id = "block" + ++i; // unique id for the clone

  // Update IDs of input fields in cloned div
  var inputs = divClone.getElementsByTagName('input');
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].id = inputs[j].id + i;
  }
  // Update IDs of select fields in cloned div
  var selects = divClone.getElementsByTagName('select');
  for (var j = 0; j < selects.length; j++) {
    selects[j].id = selects[j].id + i;
  }

  var selects = document.getElementsByTagName('text');
  for (var j = 0; j < selects.length; j++) {
    selects[j].id = selects[j].id + i;
  }

  var p = document.getElementById('funcField');
  for (var j = 0; j < p.length; j++) {
    p[j].id = p[j].id + i;
  }
  myDiv.parentNode.appendChild(divClone); // append clone to parent of original div
}

function update_full_code() {
  var blocks = document.getElementsByClassName('block');
  var fullcode = document.querySelector('.fullcode');
  var blocks_info = ""
  var funcs = ""
  var block_text = ""
  for (var i = 0; i < blocks.length; i++) {
    if (fullcode) {
      var opcode = document.getElementById('opcode' + (i === 0 ? '' : i));
      var blocktype = document.getElementById('blocktypes' + (i === 0 ? '' : i));
      var isterminal = document.getElementById('isTerminal' + (i === 0 ? '' : i));
      var blockallthreads = document.getElementById('blockAllThreads' + (i === 0 ? '' : i));
      var text = document.getElementById('text' + (i === 0 ? '' : i));
      var arg = document.getElementById('arg' + (i === 0 ? '' : i));
      var funcField = document.getElementsByClassName("funcField")[i]
      var extId = document.getElementById('extId')
      var extName = document.getElementById('extName')
      var color1 = document.getElementById('color1')

      if (opcode && blocktype && isterminal && blockallthreads && text) {
        blocks_info +=
          `
        {
          opcode:'${opcode.value}',
          blockType: Scratch.BlockType.${blocktype.value},
          isTerminal: ${isterminal.value},
          blockAllThreads: ${blockallthreads.value},
          text: '${blockTexts(["block" + (i === 0 ? '' : i)])}',
          func: '${getFunctionName(funcField.textContent)}',
        },`
        funcs += `${funcField.textContent}`
        fullcode.innerHTML = `
class ${extName.value} {
  getInfo() {
    return {
      id: '${extId.value}',
      name: '${extName.value}',
      color1: '${color1.value}',
      blockIconURI: 'iconURI',
      docsURI: 'https://cocrea.world',
      blocks: [
        ${blocks_info}
      ],
    }
  }
${funcs}
}
Scratch.extensions.register(new ${extName.value}())
        `
        Prism.highlightElement(fullcode);
      }
      else {
        throw new Error('Haha something is Null, F you ig')
      }
    }
  }
}

function blockTexts(ids) {
  var combinedString = "";

  for (var j = 0; j < ids.length; j++) {
    var pElement = document.getElementById(ids[j]);
    var elements = pElement.getElementsByTagName("input");

    for (var i = 0; i < elements.length; i++) {
      combinedString += elements[i].value;
    }
  }

  return combinedString;
}

function getFunctionName(text) {
  var end = text.indexOf('(');
  if (end !== -1) {
    return text.slice(0, end).trim();
  }
  return null;
}

function Copied() {
  let popup = document.getElementById('copied');
  popup.style.display = 'block';

  setTimeout(function() {
    popup.style.display = 'none';
  }, 2000); // Hide after 2 seconds
}

function downloadExtension() {
  // Get the element
  let element = document.querySelector('.fullcode');

  var extName = document.getElementById('extName')

  // Get the content of the element
  let content = element.textContent || element.innerText;

  // Create a Blob with the content
  let blob = new Blob([content], { type: "text/plain" });

  // Create a download link for the Blob
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = `${extName.value}.txt`;

  // Append the link to the body (needed for Firefox)
  document.body.appendChild(a);

  // Simulate a click on the link
  a.click();

  // Remove the link from the body
  document.body.removeChild(a);
}

function copyExtension() {
  var fullcode = document.querySelector('.fullcode');
  navigator.clipboard.writeText(fullcode.textContent)
    .then(() => {
      Copied();
    })
}

function New_args() {
  var pElement = document.querySelector(".block-texts");
  var text = document.getElementById("text");
  var arg = document.getElementById("arg");
  var text_clone = text.cloneNode(true);
  var arg_clone = arg.cloneNode(true);

  text_clone.id = "text" + (pElement.childElementCount);
  arg_clone.id = "arg" + (pElement.childElementCount);
  
  pElement.appendChild(text_clone);
  pElement.appendChild(arg_clone);
}

function Delete_args() {
  var pElement = document.querySelector(".block-texts");
  if (pElement.childElementCount > 2) {
    pElement.removeChild(pElement.lastChild);
    pElement.removeChild(pElement.lastChild);
  }
}

function listArguments() {
  var pElement = document.querySelector(".block-texts");
  var inputs = pElement.getElementsByClassName("block-arg");
  var argumentsDiv = document.querySelector(".arguments");
  var argumentsP = argumentsDiv.querySelector("p");

  // Clear the existing content
  argumentsP.innerHTML = "";

  // Check if there are any input elements
  if (inputs.length > 0) {
    for (var i = 0; i < inputs.length; i++) {
      // Append each value to the <p> element
      argumentsP.innerHTML += inputs[i].value + ": type: ";

      // Create a new select element and set its attributes
      var select = document.createElement("select");
      select.name = "Block types";
      select.id = "blocktypes" + i;
      select.className = "dropdown";
      select.title = "Select your block type";

      // Define the options for the select element
      var options = ["COMMAND", "REPORTER", "BOOLEAN", "HAT", "CONDITIONAL"];

      // Add each option to the select element
      for (var j = 0; j < options.length; j++) {
        var option = document.createElement("option");
        option.value = options[j];
        option.text = options[j];
        select.appendChild(option);
      }

      // Append the new select element to the <p> element
      argumentsP.appendChild(select);

      // Create a new input element for the default value and set its attributes
      var input = document.createElement("input");
      input.type = "text";
      input.className = "block-default";
      input.id = "default" + i;
      input.name = "Block-Default";
      input.placeholder = "String";

      // Append the label and new input element to the <p> element
      argumentsP.innerHTML += " default value: ";
      argumentsP.appendChild(input);

      // Add a line break after each argument
      argumentsP.innerHTML += "<br>";
    }
  } else {
    argumentsP.innerHTML = "No arguments detected.";
  }
}

var coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = 100 + "px";
    }
  });
}
