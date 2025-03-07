export function applyTypewriterEffect(elementId, forwardSpeed = 100, backwardSpeed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return;

    var i = 0;
    var txt = element.innerHTML;
    element.innerHTML = '';

    function typeForward() {
        try {
            if (i < txt.length) {
                if (element.innerHTML == "|") {
                    element.innerHTML = txt.charAt(i);
                } else {
                    element.innerHTML += txt.charAt(i);
                } 
                i++;
                setTimeout(typeForward, forwardSpeed);
            } else {
                setTimeout(clearBackward, 5000);
            }
        } catch (error) {
            // No action to take.
        }
    }

    function clearBackward() {
        try {
            if (i >= 0) {
                if (i === 0) {
                    element.innerHTML = "|";
                } else {
                    element.innerHTML = txt.substring(0, i); 
                }
                i--;
                setTimeout(clearBackward, backwardSpeed);
                
            } else {
                typeForward();
            }
        } catch (error) {
            // No action to take.
        }
    }

    typeForward();
}