const elfPrinter = (input, withSort = false) => {
  const { rules, updates } = inputParser(input);
  const validUpdates = [];
  const toBeSorted = [];

  const compareWithRules = (a, b) => {
    if (Object.keys(rules).includes(a) && rules[a].pagesBefore.includes(b)) {
      return 1;
    } else if (
      Object.keys(rules).includes(b) &&
      rules[b].pagesBefore.includes(a)
    ) {
      return -1;
    } else {
      return 0;
    }
  };

  const findValidUpdates = (input) => {
    input.forEach((update) => {

      if (update.every((page) => pageIsValid(page))) {
        validUpdates.push(update);
      } else {
        toBeSorted.push(update);
      }

      resetRulesStatus();
    });
  };

  const pageIsValid = (page) => {
    const currentActiveRulesKey = Object.keys(rules).filter(
      (ruleKey) => rules[ruleKey].status === "on"
    );
    if (Object.keys(rules).includes(page)) {
      //we need to trigger this rule to ON
      rules[page].status = "on";
    }

    const isValid = currentActiveRulesKey.every((ruleKey) => {
      const rule = rules[ruleKey];
      const pagesThatMustBeBefore = rule.pagesBefore;
      return !pagesThatMustBeBefore.includes(page);
    });

    return isValid;
  };

  const resetRulesStatus = () => {
    Object.keys(rules).forEach((ruleKey) => {
      rules[ruleKey].status = "off";
    });
  };

  findValidUpdates(updates);

  const selectedUpdates = withSort
    ? toBeSorted.map((update) => update.sort(compareWithRules))
    : validUpdates;

  const sum = selectedUpdates.reduce((acc, update) => {
    const index = Math.ceil(update.length / 2) - 1;
    acc += parseInt(update[index], 10);
    return acc;
  }, 0);

  return sum;
};

const inputParser = (input) => {
  const rules = {};
  const updates = [];

  parseInput = (input) => {
    const lines = input.split(new RegExp("[\r\n]", "g"));
    lines.forEach((line) => {
      if (line.includes("|")) {
        parseRule(line);
      } else if (line) {
        parseUpdate(line);
      }
    });
  };

  parseRule = (line) => {
    const rule = line.split("|");
    rules[rule[1]] = {
      pagesBefore: [...(rules[rule[1]]?.pagesBefore ?? []), rule[0]],
      status: "off",
    };
  };

  parseUpdate = (line) => {
    updates.push(line.split(","));
  };

  parseInput(input);

  return {
    rules,
    updates,
  };
};

module.exports = {
  elfPrinter,
};
