/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './editor.css';
// parts
import {
  Button,
  Loading,
  ControlWrapper,
  ColorPalette
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
  fontWeightValues,
  fontFamilyValues,
  getEditorData,
  readItemIndex,
  readBrandName,
  readPack,
  readKeywords
} from './editor.helper';

export function LogoEditor(props) {
  const [editorData, setEditorData] = useState([{}]);
  const [hasData, setHasData] = useState(false);

  const brandName = readBrandName(location.hash);
  const iconsPack = readPack(location.hash);
  const keywords = readKeywords(location.hash);

  const [itemIndex, setItemIndex] = useState(readItemIndex(location.hash));

  const [logoName, setLogoName] = useState('');
  const [itemData, setItemData] = useState({});

  const [isSquaredSize, setIsSquaredSize] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const sansUnit = (v, u) => v.split(u)[0];

  const galleryUri = `gallery?b=${brandName}&k=${keywords}&pack=${iconsPack}`;

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
      setLogoName(`gabriel.-${brandName}-logo${iconsPack}${itemIndex}.png`);
      setItemData(editorData[itemIndex]);
    }
  }, [editorData[itemIndex]]);

  const [brandStyle, setBrandStyle] = useState({
    top: '50%',
    left: '40%',
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Quicksand, sans-serif',
    color: '#000000'
  });

  const [iconStyle, setIconStyle] = useState({
    top: '5%',
    left: '40%',
    width: '33%'
  });

  const [printSize, setPrintSize] = useState({
    width: 400,
    height: 400
  });

  const [previewStyle, setPreviewStyle] = useState({
    background: '#f2f2f2',
    width: `${printSize.width}px`,
    height: `${printSize.height}px`
  });

  useEffect(() => {
    setPreviewStyle({
      ...previewStyle,
      width: `${printSize.width}px`,
      height: `${printSize.height}px`
    });
  }, [printSize]);

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
        <Button
          className="logo-editor__download"
          onClick={() => {
            if (!downloadProgress) {
              setDownloadProgress(true);
              domToImg(
                'generated-logo',
                logoName,
                printStyle,
                () => setDownloadProgress(false)
              );
            }
          }}
        >
          {downloadProgress
            ? <Loading maxWidth="15px" shade="fullscreen" />
            : 'Download'
          }
          <DownArrow
            className="logo-editor__btn__arrow"
          />
        </Button>
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
          alt={brandName}
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
          toWrap={
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
          toWrap={
            <select
              name="logo-editor__preview-fontfamily"
              aria-label="Logo font family control"
              defaultValue={brandStyle.fontFamily}
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
          toWrap={
            <select
              name="logo-editor__preview-fontweight"
              aria-label="Logo font weight control"
              defaultValue={brandStyle.fontWeight}
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
          toWrap={
            <input
              name="logo-editor__preview-iconleft"
              type="range"
              aria-label="Logo icon x position control"
              min="0"
              max="100"
              defaultValue={sansUnit(iconStyle.left, '%')}
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
          toWrap={
            <input
              name="logo-editor__preview-icontop"
              type="range"
              aria-label="Logo icon y position control"
              min="0"
              max="100"
              defaultValue={sansUnit(iconStyle.top, '%')}
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
          toWrap={
            <input
              name="logo-editor__preview-iconsize"
              type="range"
              aria-label="Logo icon size control"
              min="33"
              max="80"
              defaultValue={sansUnit(iconStyle.width, '%')}
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
          toWrap={
            <input
              name="logo-editor__preview-brandleft"
              type="range"
              aria-label="Logo brand x position control"
              min="0"
              max="100"
              defaultValue={sansUnit(brandStyle.left, '%')}
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
          toWrap={
            <input
              name="logo-editor__preview-brandtop"
              type="range"
              aria-label="Logo brand y position control"
              min="0"
              max="100"
              defaultValue={sansUnit(brandStyle.top, '%')}
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
          toWrap={
            <input
              name="logo-editor__preview-brandsize"
              type="range"
              aria-label="Logo brand size control"
              min="12"
              max="200"
              defaultValue={sansUnit(brandStyle.fontSize, 'px')}
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
