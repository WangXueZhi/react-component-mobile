 let formatTel = (telephone) => {
    if (telephone == '' || telephone == null || telephone == undefined) return;
    return telephone.substring(0, 3) + '****' + telephone.substring(7);
};

export default formatTel;