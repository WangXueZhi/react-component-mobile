export let trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};

export default trim;