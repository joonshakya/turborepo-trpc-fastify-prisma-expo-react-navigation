import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Post } from "@acme/db";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";

import { Form, FormField } from "~/components/forms";
import { api } from "~/utils/trpc";
import { ListItemSeparator } from "../components/lists";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { AppNavigatorParamList } from "../navigation/AppNavigator";
import routes from "../navigation/routes";

export default function HomeScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AppNavigatorParamList, routes.HOME>;
}) {
  const {
    data: posts,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = api.post.all.useQuery();

  return (
    <Screen
      noSafeArea
      className="px-5"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <DemoCard navigation={navigation} />
      <CreatePostCard />
      <PostList posts={posts || []} isLoading={isLoading} error={error} />
    </Screen>
  );
}

function FormContent() {
  const { handleSubmit } = useFormikContext();
  return (
    <>
      <View className="p-2">
        <FormField label="Title" name="title" />
        <FormField
          label="Content"
          name="content"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
      <CardButton title="Create" onPress={handleSubmit} />
    </>
  );
}

function DemoCard({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AppNavigatorParamList, routes.HOME>;
}) {
  return (
    <View className="my-4 overflow-hidden rounded-lg bg-white">
      <View className="p-3 pb-2">
        <Text className="text-xl font-bold">Title</Text>
        <Text className="text-mediumGray my-1 text-base font-bold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
          doloremque eos.
        </Text>
      </View>
      {[
        {
          title: "Go to Inner Screen 1",
          onPress: () =>
            navigation.push(routes.INNER, {
              title: "Inner Screen 1",
            }),
        },
        {
          title: "Go to Inner Screen 2",
          onPress: () =>
            navigation.push(routes.INNER, {
              title: "Inner Screen 2",
            }),
        },
      ].map(({ title, onPress }) => (
        <CardButton key={title} title={title} onPress={onPress} />
      ))}
    </View>
  );
}

function CreatePostCard() {
  const utils = api.useUtils();

  const { mutateAsync: createPost } = api.post.create.useMutation({
    onSettled: () => {
      utils.post.all.invalidate();
    },
  });

  const formInitialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Title"),
    content: Yup.string().required().min(1).label("Content"),
  });

  const handleSubmit = async (
    values: typeof formInitialValues,
    { resetForm }: FormikHelpers<typeof formInitialValues>,
  ) => {
    try {
      await createPost(values);
      utils.post.all.invalidate();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="my-4">
      <Text className="text-3xl font-bold">Create Post</Text>
      <View className="mt-4 overflow-hidden rounded-lg bg-white">
        <Form
          initialValues={formInitialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormContent />
        </Form>
      </View>
    </View>
  );
}

function PostList({
  posts,
  isLoading,
  error,
}: {
  posts: Post[];
  isLoading: boolean;
  error: any;
}) {
  const utils = api.useUtils();

  const { mutate: deletePost } = api.post.delete.useMutation({
    onSettled: () => {
      utils.post.all.invalidate();
    },
  });

  return (
    <View className="mt-4">
      <Text className="text-3xl font-bold">Posts</Text>
      {isLoading && (
        <View className="h-32 justify-center">
          <ActivityIndicator size="large" />
        </View>
      )}
      {error && <Text>{error.message}</Text>}
      {posts.length === 0 && !isLoading && (
        <View className="items-center py-5">
          <Text className="text-base">No posts to show</Text>
        </View>
      )}
      <View className="mt-4">
        {posts.map((post) => (
          <View
            className="mb-4 flex-row overflow-hidden rounded-lg bg-white"
            key={post.id}
          >
            <View className="flex-1 p-3 pb-2">
              <Text className="text-xl font-bold">{post.title}</Text>
              <Text className="text-mediumGray my-1 text-base font-bold">
                {post.content}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                className="p-3"
                onPress={() => deletePost(post.id)}
              >
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color={colors.mediumGray}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function CardButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <>
      <View className="pl-3">
        <ListItemSeparator />
      </View>
      <TouchableHighlight
        className="p-2.5 pl-3"
        underlayColor={colors.highlight}
        accessibilityRole="button"
        onPress={onPress}
      >
        <Text className="text-primary text-lg">{title}</Text>
      </TouchableHighlight>
    </>
  );
}
