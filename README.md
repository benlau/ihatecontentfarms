# Content Farm Blocker
======================

# 0.5版本

- 因為Chrome將不支援V2 Manifest，所以將Content Farm Blocker升級到V3 Manifest。
- V3 Manifest並不支援webRequestBlock，改用了declarativeNetRequest
- 因此權限要求改變，你會發現Chrome會通知你權限被改變，這是正常的現象。
- 要是你選擇繼續使用Content Farm Blocker，請不要移險，感謝你的支持。

關於v0.5.0的用戶黑名單消失的問題 #48
https://github.com/benlau/ihatecontentfarms/issues/48
 
# 簡介

你今天震驚了嗎？有否為大量誇張失實的標題文章湧進日常生活而感到厭感？

即使告訢朋友不要再轉載有關文章，結果還是不會消失，最後只能進行消極的抵抗 － 不點擊，不讓自己為對方的廣告收益帶來貢獻。

可是 －

有時候會點錯，當網頁打開後才察覺到自己又中了計。

這個擴充套件就是為解決以上問題而做出來的，每當用戶準備打開內容農場的文章時，就會出來攔截，以免點進內容農場。

功能

 1. 在打開內容農場時進行攔截
 
 2. 用戶可以選擇繼續，然後在10分鐘內不再對同一網址進行攔截
 
 3. 自定黑名單及白名單

下載:

[Content Farm Blocker - Chrome 線上應用程式商店](https://chrome.google.com/webstore/detail/opjaibbmmpldcncnbbglondckfnokfpm?hl=zh-TW)


Unit Tests
----------

```
npm run test
```
