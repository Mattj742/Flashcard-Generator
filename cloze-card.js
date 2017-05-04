var ClozeCard = function(text, cloze) {
	this.cloze = cloze;
	this.fullText = text;
	this.partial = text.replace(cloze, "...");
};

module.exports = ClozeCard;