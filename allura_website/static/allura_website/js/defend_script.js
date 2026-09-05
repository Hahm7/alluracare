// Script to protect against ddos attack (prevent f5 after submit)

if (window.history.replaceState) {
    window.history.replaceState(null,null, window.location.href);
};
