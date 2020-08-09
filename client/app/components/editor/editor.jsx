/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './editor.css';
// parts
import {
  Button,
  Loading,
  ControlWrapper,
  ColorPalette,
  Input
} from '../';
import {
  DownArrow,
  CloseIcon,
  Logo,
  BackArrow,
  RightArrow
} from '../icons';
// helpers
import {
  domToImg,
  getEditorData,
  readItemIndex,
  readBrandName,
  readPack,
  readKeywords,
  sansUnit,
  stored
} from './editor.helper';
// data
import {
  fontWeightValues,
  fontFamilyValues,
  exportTypes
} from './editor.data';

export function LogoEditor(props) {
  const brandName = readBrandName(location.hash);
  const iconsPack = readPack(location.hash);
  const keywords = readKeywords(location.hash);

  const [editorData, setEditorData] = useState([{}]);
  const [hasData, setHasData] = useState(false);

  const [itemIndex, setItemIndex] = useState(readItemIndex(location.hash));
  const [itemData, setItemData] = useState({});

  const [showExportPanel, setShowExportPanel] = useState(false);
  const [exportType, setExportType] = useState('png');
  const [downloadProgress, setDownloadProgress] = useState(false);

  const [logoName, setLogoName] = useState('');

  const galleryUri = `gallery?b=${brandName}&k=${keywords}&pack=${iconsPack}`;

  const [brandStyle, setBrandStyle] = useState({
    top: stored('logo-brand-top') || '50%',
    left: stored('logo-brand-left') || '40%',
    fontSize: stored('logo-brand-size') || '24px',
    fontWeight: stored('logo-font-weight') || '700',
    fontFamily: stored('logo-font-family') || "'Quicksand', sans-serif",
    color: stored('logo-preview-color') || '#000000'
  });

  const [iconStyle, setIconStyle] = useState({
    top: stored('logo-icon-top') || '5%',
    left: stored('logo-icon-left') || '40%',
    width: stored('logo-icon-size') || '33%'
  });

  let storeLogoSize = stored('logo-size');
  storeLogoSize = storeLogoSize ? storeLogoSize.split('.') : [];
  const [isSquaredSize, setIsSquaredSize] = useState(storeLogoSize[1] !== 'false' && true);
  const [printSize, setPrintSize] = useState({
    width: storeLogoSize[0] || 400,
    height: storeLogoSize[2] || 400
  });

  const [previewStyle, setPreviewStyle] = useState({
    background: stored('logo-preview-bg') || '#f2f2f2',
    width: `${printSize.width}px`,
    height: `${printSize.height}px`
  });

  const printStyle = {
    // no unit, is passed directly as a number to domtoimage
    width: printSize.width || 400,
    // no unit, is passed directly as a number to domtoimage
    height: printSize.height || 400,
    background: previewStyle.background || '#f2f2f2',
    textAlign: 'center',
    brandStyle: brandStyle || {},
    iconStyle: iconStyle || {}
  };

  const newIndex = n => props.location.search
    .replace(
      /i=[0-9]+/,
      `i=${n}`
    );

  useEffect(() => {
    if (!hasData) {
      getEditorData(data => {
        if (itemIndex < data.length) {
          setHasData(true);
          setEditorData(data);
        } else {
          props.history.push(`/?b=${brandName}&k=${keywords}`);
        }
      }, () => props.history.push(galleryUri));
    }
  }, [hasData]);

  useEffect(() => {
    if (editorData[itemIndex]) {
      setLogoName(
        stored('export-filename')
        || `gabriel.-${brandName}-logo${iconsPack}${itemIndex}`
      );
      setItemData(editorData[itemIndex]);
    }
  }, [editorData[itemIndex]]);

  useEffect(() => {
    setPreviewStyle({
      ...previewStyle,
      width: `${printSize.width}px`,
      height: `${printSize.height}px`
    });
  }, [printSize]);

  return (
    <div className="logo-editor">
      <div className="logo-editor__top">
        <div className="app-brand">
          <Link
            to="/"
            style={{
              width: '100px',
              display: 'block'
            }}
          >
            <Logo
              aria-label="App logo"
            />
          </Link>
        </div>
        <div className="export-box">
          <Button
            theme="light"
            active={showExportPanel}
            className="export-button"
            onClick={() => {
              setShowExportPanel(!showExportPanel);
            }}
          >
            <span>Export</span>
            <DownArrow
              className="export-button__arrow"
            />
          </Button>
          {showExportPanel
            && <div className="export-box__panel">
              <Input
                label="Filename"
                id="export-filename"
                remember="export-filename"
                type="text"
                maxLength={250}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="true"
                defaultValue={logoName}
                onChange={e => {
                  setLogoName(e.target.value);
                }}
              />
              <ControlWrapper
                className="export-type"
                label="Type"
                remember="export-type"
                value={exportType}
                toWrap={saved => <select
                  name="export-type"
                  defaultValue={saved}
                  onChange={e => {
                    setExportType(e.target.value);
                  }}
                >
                  {exportTypes.map((o, i) =>
                    <option
                      key={i}
                      value={o.value}
                    >
                      {o.name}
                    </option>
                  )}
                </select>
                }
              />
              <div className="export-box__save-wrap">
                <Button
                  theme="light"
                  className="export-box__save"
                  onClick={() => {
                    if (!downloadProgress) {
                      setDownloadProgress(true);
                      domToImg(
                        'generated-logo',
                        logoName,
                        exportType,
                        printStyle,
                        () => setDownloadProgress(false)
                      );
                    }
                  }}
                >
                  {downloadProgress
                    ? <Loading maxWidth="10px" shade="fullscreen" />
                    : 'Save'
                  }
                </Button>
              </div>
            </div>
          }
        </div>
        <button
          className="logo-editor__close"
          onClick={() => {
            props.history.push(galleryUri);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div
        id="generated-logo"
        className="logo-editor__preview"
        style={previewStyle}
        title="Editor preview"
        aria-label="Logo editor preview"
      >
        <img
          draggable="true"
          id="generated-logo__icon"
          alt={`"${brandName}" Logo's icon`}
          src={itemData.preview_url}
          width={iconStyle.width}
          style={iconStyle}
        />
        <p
          draggable="true"
          id="generated-logo__brand"
          style={brandStyle}
        >
          {brandName}
        </p>
      </div>
      <div className="logo-editor__controls">
        <ControlWrapper
          label="Size"
          remember="logo-size"
          value={`${printSize.width}.${isSquaredSize}.${printSize.height}`}
          toWrap={() =>
            <Fragment>
              <input
                name="logo-editor__preview-width"
                className="logo-editor__preview-size"
                type="number"
                aria-label="Logo width control"
                value={printSize.width || 400}
                min="100"
                max="2000"
                onChange={e => {
                  setPrintSize({
                    width: e.target.value,
                    height: isSquaredSize ? e.target.value : printSize.height
                  });
                }}
              />
              <input
                name="logo-editor__squaredsize"
                className="logo-editor__squaredsize"
                type="checkbox"
                defaultChecked={isSquaredSize}
                onChange={e => {
                  setIsSquaredSize(e.target.checked);
                }}
              />
              <input
                name="logo-editor__preview-height"
                className="logo-editor__preview-size"
                type="number"
                aria-label="Logo height control"
                value={printSize.height || 400}
                min="100"
                max="2000"
                onChange={e => {
                  setPrintSize({
                    height: e.target.value,
                    width: isSquaredSize ? e.target.value : printSize.width
                  });
                }}
              />
            </Fragment>
          }
        />
        <ControlWrapper
          label="Font Family"
          remember="logo-font-family"
          value={brandStyle.fontFamily}
          toWrap={saved =>
            <select
              name="logo-editor__preview-fontfamily"
              aria-label="Logo font family control"
              defaultValue={saved || brandStyle.fontFamily}
              onChange={e => {
                setBrandStyle({
                  ...brandStyle,
                  fontFamily: e.target.value
                });
              }}
            >
              {fontFamilyValues.map((o, i) =>
                <option
                  key={i}
                  value={o.value}
                  style={{
                    fontFamily: `${o.value}`
                  }}
                >
                  {o.name}
                </option>
              )}
            </select>
          }
        />
        <ControlWrapper
          label="Font Weight"
          remember="logo-font-weight"
          value={brandStyle.fontWeight}
          toWrap={saved =>
            <select
              name="logo-editor__preview-fontweight"
              aria-label="Logo font weight control"
              defaultValue={saved || brandStyle.fontWeight}
              onChange={e => {
                setBrandStyle({
                  ...brandStyle,
                  fontWeight: e.target.value
                });
              }}
            >
              {fontWeightValues.map((o, i) =>
                <option key={i} value={o.value}>{o.name}</option>
              )}
            </select>
          }
        />
        <ColorPalette
          label="Background"
          aria-label="Logo background color control"
          name="logo-editor__preview-bg"
          remember="logo-preview-bg"
          defaultValue={previewStyle.background}
          onInput={value => {
            setPreviewStyle({
              ...previewStyle,
              background: value
            });
          }}
        />
        <ColorPalette
          label="Color"
          aria-label="Logo font color control"
          name="logo-editor__preview-color"
          remember="logo-preview-color"
          defaultValue={brandStyle.color}
          onInput={value => {
            setBrandStyle({
              ...brandStyle,
              color: value
            });
          }}
        />
        <ControlWrapper
          label="Icon X"
          remember="logo-icon-left"
          value={iconStyle.left}
          toWrap={saved =>
            <input
              name="logo-editor__preview-iconleft"
              type="range"
              aria-label="Logo icon x position control"
              min="0"
              max="100"
              defaultValue={sansUnit(saved, '%') || sansUnit(iconStyle.left, '%')}
              onInput={e => {
                setIconStyle({
                  ...iconStyle,
                  left: `${e.target.value}%`
                });
              }}
            />
          }
        />
        <ControlWrapper
          label="Icon Y"
          remember="logo-icon-top"
          value={iconStyle.top}
          toWrap={saved =>
            <input
              name="logo-editor__preview-icontop"
              type="range"
              aria-label="Logo icon y position control"
              min="0"
              max="100"
              defaultValue={sansUnit(saved, '%') || sansUnit(iconStyle.top, '%')}
              onInput={e => {
                setIconStyle({
                  ...iconStyle,
                  top: `${e.target.value}%`
                });
              }}
            />
          }
        />
        <ControlWrapper
          label="Icon Size"
          remember="logo-icon-size"
          value={iconStyle.width}
          toWrap={saved =>
            <input
              name="logo-editor__preview-iconsize"
              type="range"
              aria-label="Logo icon size control"
              min="10"
              max="80"
              defaultValue={sansUnit(saved, '%') || sansUnit(iconStyle.width, '%')}
              onInput={e => {
                setIconStyle({
                  ...iconStyle,
                  width: `${e.target.value}%`
                });
              }}
            />
          }
        />
        <ControlWrapper
          label="Brand X"
          remember="logo-brand-left"
          value={brandStyle.left}
          toWrap={saved =>
            <input
              name="logo-editor__preview-brandleft"
              type="range"
              aria-label="Logo brand x position control"
              min="0"
              max="100"
              defaultValue={sansUnit(saved, '%') || sansUnit(brandStyle.left, '%')}
              onInput={e => {
                setBrandStyle({
                  ...brandStyle,
                  left: `${e.target.value}%`
                });
              }}
            />
          }
        />
        <ControlWrapper
          label="Brand Y"
          remember="logo-brand-top"
          value={brandStyle.top}
          toWrap={saved =>
            <input
              name="logo-editor__preview-brandtop"
              type="range"
              aria-label="Logo brand y position control"
              min="0"
              max="100"
              defaultValue={sansUnit(saved, '%') || sansUnit(brandStyle.top, '%')}
              onInput={e => {
                setBrandStyle({
                  ...brandStyle,
                  top: `${e.target.value}%`
                });
              }}
            />
          }
        />
        <ControlWrapper
          label="Brand Size"
          remember="logo-brand-size"
          value={brandStyle.fontSize}
          toWrap={saved =>
            <input
              name="logo-editor__preview-brandsize"
              type="range"
              aria-label="Logo brand size control"
              min="12"
              max="200"
              defaultValue={sansUnit(saved, 'px') || sansUnit(brandStyle.fontSize, 'px')}
              onInput={e => {
                setBrandStyle({
                  ...brandStyle,
                  fontSize: `${e.target.value}px`
                });
              }}
            />
          }
        />
      </div>
      <div className="logo-editor__pagination">
        <button
          title="Previous icon"
          aria-label="Previous icon"
          className="link-style"
          onClick={() => {
            let prev = itemIndex - 1;
            prev = prev <= 0 ? 0 : prev % 6;
            if (props.location.search !== newIndex(prev)) {
              props.history.push(newIndex(prev));
              setItemIndex(prev);
            }
          }}
        >
          <BackArrow width="35" />
        </button>
        <button
          title="Next icon"
          aria-label="Next icon"
          className="link-style"
          onClick={() => {
            let next = itemIndex + 1;
            next = next <= 0 ? 0 : next % 6;
            props.history.push(newIndex(next));
            setItemIndex(next);
          }}
        >
          <RightArrow width="35" />
        </button>
      </div>
    </div>
  );
}
