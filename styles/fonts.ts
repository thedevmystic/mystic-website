/**
 * Copyright 2026-present Suryansh Singh
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ------------------------------------------------------------------------------------------------
 *
 * @file fonts.ts
 * @description Defines fonts for the application.
 * @author thedevmystic (Surya)
 * @copyright 2026-present Suryansh Singh Apache-2.0 License
 *
 * SPDX-FileCopyrightText: 2026-present Suryansh Singh
 * SPDX-License-Identifier: Apache-2.0
 */

import { Allura, Fraunces, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';

export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: 'variable',
  variable: '--font-fraunces',
  preload: true,
  display: 'swap',
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: 'variable',
  variable: '--font-ibm-plex-sans',
  preload: true,
  display: 'swap',
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-jetbrains-mono',
  preload: false,
  display: 'swap',
});

export const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  preload: false,
  display: 'swap',
});

export const fonts = [
  fraunces.variable,
  ibmPlexSans.variable,
  jetBrainsMono.variable,
  allura.variable,
].join(' ');
