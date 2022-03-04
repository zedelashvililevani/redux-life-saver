# Redux Life Saver (RLS) Intro

Fed up with `reducers` that has a dozen lines of code?

Tired of dull `actions` that destroy your time?

Disturbed by what it takes just to prepare the `connects`?

<img src="https://i.imgur.com/Ppv5RhZ.gif" width="264" height="264">


>**Then welcome the all-new `Redux-Life-Saver` perfection series.**

**A RLS so short and powerfull, you can write everything into one line**

```
const { data } = useData(MyName, {url, params});
```


>**Wait, whaat?**

<img src="https://media2.giphy.com/media/fpXxIjftmkk9y/giphy.gif?cid=ecf05e47p5s3plr3gx8kfb68k0joan9pxna4xkigti49b1du&rid=giphy.gif" width="100" height="100">


**A design so extraordinary, it has a `fetch` `reFetch` `fetchMore`**

**to make `fetch` `reFetch` `fetchMore` easier then ever before**

```
// of course with it's fetch policys (onFetch, onFetchMore, onError)
const { data, reFetch, fetchMore } = useData(MyName, {url, params});
```


**fetching handles so ingenious, you can catch from `NetworkStatus` and your problems never get in the way**

```
// loading, ready, refetch, fetchMore, error
const { data, networkStatus } = useData(MyName, {url, params});
```


### But, that's not all

<img src="https://media0.giphy.com/media/11lLyyfu7GfjH2/giphy.gif?cid=790b761179b6bbb7cce285a3679940a7045e4aabf97648eb&rid=giphy.gif" width="100" height="100">

**if you use Ultra `Miracle RLS` 2022 for free, you will get brand new read/write from cache totally free**
```
const yourData = useReadCache(MyName);
```
```
const writeCache = useWriteCache();
writeCache(MyName, newCache);
```

*RLS is so good and so durable, it worthy of the name `Miracle RLS`*

*since 2019 dozen developers have enjoyed the durability and value of Miracle RLS*

*it tested over 2 years in developement to create `The all-new Miracle RLS`*
