const userContext = {}; // Exemplo: { userId: { cityId: { stack: [] } } }

function initializeUserContext(userId, cityId) {
    if (!userContext[userId]) {
        userContext[userId] = {};
    }
    if (!userContext[userId][cityId]) {
        userContext[userId][cityId] = { stack: [] };
    }
}

function addToStack(userId, cityId, option) {
    initializeUserContext(userId, cityId);
    userContext[userId][cityId].stack.push(option);
}

function getLastFromStack(userId, cityId) {
    initializeUserContext(userId, cityId);
    const stack = userContext[userId][cityId].stack;
    return stack.length > 0 ? stack[stack.length - 1] : null;
}

function resetStack(userId, cityId) {
    if (userContext[userId] && userContext[userId][cityId]) {
        userContext[userId][cityId].stack = [];
    }
}

function removeFromStack(userId, cityId) {
    initializeUserContext(userId, cityId);
    if (userContext[userId][cityId].stack.length > 0) {
        userContext[userId][cityId].stack.pop();
    }
}

module.exports = {
    addToStack,
    getLastFromStack,
    resetStack,
    removeFromStack,
};