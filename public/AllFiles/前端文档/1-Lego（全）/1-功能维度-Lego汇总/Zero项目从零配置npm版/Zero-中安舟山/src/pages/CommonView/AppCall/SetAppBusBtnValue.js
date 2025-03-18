export function setAppBusBtnvalue(
  multipleProps,
  sourceData,
  config,
  appId,
  recordIds,
  module,
  spaceId,
  masterTableId,
) {
  const sourceDataItem = multipleProps
    ? multipleProps.map(item => item.sourceData)
    : [sourceData];
  const appConfig = Object.assign(
    {
      name: config.title,
      type: config.type,
      spaceId,
      id: config.id,
      icon: config.icon,
      target: config.detail.open,
      sourceData: sourceDataItem,
    },
    {
      sourceApp: {
        recordIds,
        linkappTableId: masterTableId,
        linkappId: appId,
        linkappModule: module,
      },
    },
    config.detail,
  );
  const fieldData = {};
  const fieldRelease = {};
  const { isSlaveTable } = appConfig.linkTable;
  const sourceFieldArr = (appConfig.fieldGroup || [])
    .filter((group) => {
      if (isSlaveTable) {
        if (group.sourceValType === 'custom-source') {
          customSource.push(group.targetField.id);
          objCustomSource[group.targetField.id] = group.sourceVal;
          fieldData[group.targetField.id] = group.sourceVal;
        }
        return true;
      }
      if (group.sourceValType !== 'custom-source') {
        return true;
      }
      // 非赋值从表的自定义按钮可在此赋值
      customSource.push(group.targetField.id);
      objCustomSource[group.targetField.id] = group.sourceVal;
      fieldData[group.targetField.id] = group.sourceVal;
      return false;
    })
    .map((group) => {
      fieldRelease[`${group.targetField.belongs}_${group.targetField.id}`] = {
        id: group.sourceField.id,
        targetType: group.targetField.type,
        sourceType: group.sourceField.type,
      };
      return group.sourceField.id;
    });

  // eslint-disable-next-line no-restricted-syntax
  for (const key in appConfig.sourceData[0]) {
    if (sourceFieldArr.indexOf(key) !== -1) {
      fieldData[key] = appConfig.sourceData[0][key];
    }
  }
  // eslint-disable-next-line no-unused-expressions
  appConfig.sourceApp.recordIds.length > 1 && delete appConfig.sourceData;
  const appBusBtnData = Object.assign(
    {},
    {
      linkapp: appConfig.sourceApp,
      config: appConfig,
    },
  );
  appBusBtnData.data = appConfig.sourceApp.recordIds.length > 1 ? [] : fieldData;
  // eslint-disable-next-line no-unused-expressions
  !appConfig.linkAppRecord && delete appBusBtnData.linkapp.recordIds;
  return {
    appBusBtnData,
    appConfig,
  };
}

export function setFormAppBusBtnvalue(
  buttonConfig,
  masterTableFields,
  originData,
  editable,
  form,
  table,
  app,
  module,
) {
  const fieldRelease = {};
  const arrSourceData = [];
  const slaveFields = {};
  const slaveFieldsValue = [];
  const sourceFieldArr = buttonConfig.fieldGroup.map((group) => {
    const sourceFieldId = group.sourceValType !== 'custom-source'
      ? group.sourceField.id
      : `custom-${group.targetField.id}`;
    fieldRelease[
      `${group.targetField.belongs}_${group.targetField.id}`
    ] = sourceFieldId;
    if (group.sourceValType === 'custom-source') {
      slaveFields[
        `${group.targetField.belongs}_${group.targetField.id}`
      ] = `custom-${group.targetField.id}`;
      slaveFieldsValue[`custom-${group.targetField.id}`] = group.sourceVal;
    }
    return sourceFieldId;
  });
  let appBusBtnData = {};
  const fieldData = {};
  let linkapp = {};
  let sourceFieldValues = null;
  if (editable) {
    sourceFieldValues = masterTableFields;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in masterTableFields) {
      if (sourceFieldArr.indexOf(key) !== -1) {
        fieldData[key] = sourceFieldValues[key].value || '';
      }
    }
  } else {
    sourceFieldValues = originData;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in originData) {
      if (sourceFieldArr.indexOf(key) !== -1) {
        fieldData[key] = sourceFieldValues[key];
      }
    }
  }
  if (buttonConfig.linkTable.isSlaveTable) {
    console.log('从表赋值');
  } else {
    if (buttonConfig.linkAppRecord) {
      linkapp = {
        recordIds: [form],
        linkappId: app,
        linkappTableId: table,
        linkappModule: module,
      };
    }

    appBusBtnData = {
      data: fieldData,
      config: buttonConfig,
      linkapp,
    };
    // console.log(appBusBtnData, 'appBusBtnData');
    const storageTitle = `appBusBtn${buttonConfig.linkApp.id}`;
    localStorage.setItem(storageTitle, JSON.stringify(appBusBtnData));
  }
}
