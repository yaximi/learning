/**
 *
 * @param originEle 原始element元素
 * @param rows 展示几行展示不开，折叠
 * @param content 文案
 * @param fixedContent 展开的文案，默认 展开
 * @param ellipsisStr 省略号文案，默认 ...
 * @returns {{content: *, ellipsis: boolean}|{text: string, content: *, ellipsis: boolean}}
 */
window.measure = (
    originEle,
    rows,
    content,
    fixedContent,
    ellipsisStr
) => {
    // 用来计算所占高度的dom元素
    let ellipsisContainer = document.createElement('div');
    ellipsisContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ellipsisContainer);

    // 获取原始style
    const originStyle = window.getComputedStyle(originEle);
    const originCSS = styleToString(originStyle);
    const lineHeight = pxToNumber(originStyle.lineHeight);
    const maxHeight =
        lineHeight * (rows + 1) +
        pxToNumber(originStyle.paddingTop) +
        pxToNumber(originStyle.paddingBottom);

    // 设置样式，确保不会影响高度宽度的计算
    {
        ellipsisContainer.setAttribute('style', originCSS);
        ellipsisContainer.style.position = 'fixed';
        ellipsisContainer.style.left = '0';
        ellipsisContainer.style.height = 'auto';
        ellipsisContainer.style.minHeight = 'auto';
        ellipsisContainer.style.maxHeight = 'auto';
        ellipsisContainer.style.top = '-999999px';
        ellipsisContainer.style.zIndex = '-1000';
        ellipsisContainer.style.textOverflow = 'clip';
        ellipsisContainer.style.whiteSpace = 'normal';
        ellipsisContainer.style.webkitLineClamp = 'none';
    }

    // 插入所有文案，去掉所有样式影响，看下是否可以装下所有内容
    const wrapperStyle = `padding: 0;margin: 0;display: 'inline';lineHeight: 'inherit';`;
    ellipsisContainer.innerHTML = `<div style=${wrapperStyle}><span style=${wrapperStyle}>${content}</span></div>`;

    // 如果可以装下所有内容，则跳过省略号计算
    if (inRange()) {
        document.body.removeChild(ellipsisContainer);
        return { content, text: ellipsisContainer.innerHTML, ellipsis: false };
    }

    // 查找匹配省略号内容
    ellipsisContainer.innerHTML = ``;

    // 插入 省略号
    const ellipsisTextNode = document.createTextNode(ellipsisStr);
    ellipsisContainer.appendChild(ellipsisTextNode);

    // 插入 展开 按钮
    const fixedContentNode = document.createTextNode(fixedContent);
    ellipsisContainer.appendChild(fixedContentNode);

    // 插入 文案
    const textNode = document.createTextNode(content);
    ellipsisContainer.appendChild(textNode);

    // 计算应该展示的文案
    const result = measureText(textNode, content);

    document.body.removeChild(ellipsisContainer);

    return {
        content: ( result && result.reactNode ) || content,
        ellipsis: true,
    };

    // 检查div的高度是否足以容纳内容
    function inRange() {
        return ellipsisContainer.offsetHeight < maxHeight;
    }

    // 获得最大文本数
    function measureText(
        textNode,
        fullText,
        startLoc = 0,
        endLoc = fullText.length,
        lastSuccessLoc = 0
    ) {
        const midLoc = Math.floor((startLoc + endLoc) / 2);
        const currentText = fullText.slice(0, midLoc);
        textNode.textContent = currentText;

        if (startLoc >= endLoc - 1) {
            // 循环找出最小的step
            for (let step = endLoc; step >= startLoc; step -= 1) {
                const currentStepText = fullText.slice(0, step);
                textNode.textContent = currentStepText;
                if (inRange()) {
                    return step === fullText.length
                        ? {
                            finished: false,
                            reactNode: fullText,
                        }
                        : {
                            finished: true,
                            reactNode: currentStepText,
                        };
                }
            }
        }

        if (inRange()) {
            return measureText(textNode, fullText, midLoc, endLoc, midLoc);
        }
        return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
    }

    // style转换成string
    function styleToString(style) {
        const styleNames = Array.prototype.slice.apply(style);
        return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
    }

    //  px转换成数字
    function pxToNumber(value) {
        if (!value) return 0;
        const match = value.match(/^\d*(\.\d*)?/);
        return match ? Number(match[0]) : 0;
    }
};
